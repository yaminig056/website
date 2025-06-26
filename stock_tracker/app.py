from flask import Flask, render_template, request, redirect, session, url_for
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
import os
import yfinance as yf
from dotenv import load_dotenv
from newsapi_scraper import get_latest_news
from sentiment import analyze_sentiment
from send_email import send_sentiment_email

load_dotenv()
EMAIL_ADDRESS = os.getenv('EMAIL')
EMAIL_PASSWORD = os.getenv('EMAIL_PASS')
MANAGER_EMAIL = os.getenv('MANAGER_EMAIL')

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.permanent_session_lifetime = timedelta(days=7)

# ------------------- INIT DB -------------------
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS user_stocks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_email TEXT NOT NULL,
                    ticker TEXT NOT NULL
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS user_shares (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_email TEXT NOT NULL,
                    ticker TEXT NOT NULL,
                    quantity INTEGER NOT NULL,
                    purchase_price REAL NOT NULL
                )''')
    conn.commit()
    conn.close()

init_db()

# ------------------- CACHED NEWS -------------------
news_cache = {}
def get_cached_news(company_name):
    now = datetime.now()
    if company_name in news_cache:
        cached_time, news_data = news_cache[company_name]
        if now - cached_time < timedelta(minutes=10):
            return news_data
    try:
        news_data = get_latest_news(company_name + " stock", max_results=5)
    except Exception as e:
        print(f"❌ News fetch failed for {company_name}: {e}")
        news_data = []
    news_cache[company_name] = (now, news_data)
    return news_data

# ------------------- ROUTES -------------------

@app.route('/')
def root():
    return redirect(url_for('home')) if 'user' in session else redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user' in session:
        return redirect(url_for('home'))
    if request.method == 'POST':
        form_type = request.form.get('form_type')
        email = request.form.get('email')
        password = request.form.get('password')
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        if form_type == 'login':
            c.execute('SELECT * FROM users WHERE email = ?', (email,))
            user = c.fetchone()
            if user and check_password_hash(user[2], password):
                session['user'] = email
                return redirect(url_for('home'))
            return render_template('login_signup.html', error="Invalid login credentials")
        elif form_type == 'signup':
            hashed_pw = generate_password_hash(password)
            try:
                c.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, hashed_pw))
                conn.commit()
                session['user'] = email
                return redirect(url_for('home'))
            except sqlite3.IntegrityError:
                return render_template('login_signup.html', error="Email already exists")
    return render_template('login_signup.html')

@app.route('/home')
def home():
    if 'user' not in session: return redirect(url_for('login'))
    companies = [
        {'name': 'HDFC Bank', 'ticker': 'HDFCBANK.NS'},
        {'name': 'Infosys', 'ticker': 'INFY.NS'},
        {'name': 'Reliance', 'ticker': 'RELIANCE.NS'},
        {'name': 'TCS', 'ticker': 'TCS.NS'},
        {'name': 'State Bank of India', 'ticker': 'SBIN.NS'}
    ]
    company_data = []
    for company in companies:
        try:
            stock = yf.Ticker(company['ticker'])
            price = stock.info.get('regularMarketPrice')
            if not price:
                hist = stock.history(period="1d")
                price = hist['Close'].iloc[-1] if not hist.empty else 'N/A'

            previous_close = stock.info.get('previousClose', price)
            change = round(price - previous_close, 2) if price != 'N/A' else 0
            percent_change = round((change / previous_close) * 100, 2) if previous_close else 0
        except Exception as e:
            print(f"Error fetching stock for {company['name']}: {e}")
            price, change, percent_change = 'N/A', 0, 0

        news = get_cached_news(company['name'])
        company_data.append({
            'name': company['name'],
            'ticker': company['ticker'],
            'price': round(price, 2) if price != 'N/A' else 'N/A',
            'change': change,
            'percent_change': percent_change,
            'news': news
        })
    return render_template('index.html', user=session['user'], companies=company_data)

@app.route('/stock/<ticker>')
def stock_detail(ticker):
    if 'user' not in session:
        return redirect(url_for('login'))

    stock = yf.Ticker(ticker)
    try:
        info = stock.info
        if not info or 'shortName' not in info:
            raise ValueError("Invalid stock info.")
        open_price = info.get('open', 'N/A')
        high_price = info.get('dayHigh', 'N/A')
        low_price = info.get('dayLow', 'N/A')
    except Exception as e:
        return render_template("error.html", message=f"Unable to load stock data: {e}")

    hist = stock.history(period="6mo")
    import plotly.graph_objs as go
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=hist.index, y=hist['Close'], name='Close Price'))
    fig.update_layout(title=f"{info.get('shortName', ticker)} - 6 Month Trend", xaxis_title='Date', yaxis_title='Price')
    chart = fig.to_html(full_html=False)

    company_name = info.get('shortName', ticker)
    articles = get_cached_news(company_name)
    titles = [article['title'] for article in articles]
    _, sentiment = analyze_sentiment(titles)

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM user_stocks WHERE user_email = ? AND ticker = ?', (session['user'], ticker))
    owned = c.fetchone()
    conn.close()

    if sentiment == 'Positive':
        send_sentiment_email(session['user'], ticker, sentiment)
        send_sentiment_email(MANAGER_EMAIL, ticker, sentiment)
    elif sentiment == 'Negative':
        send_sentiment_email(MANAGER_EMAIL, ticker, sentiment)

    return render_template("stock_detail.html", stock=info, chart=chart, articles=articles, sentiment=sentiment, ticker=ticker,
                           open_price=open_price, high_price=high_price, low_price=low_price)

@app.route('/buy/<ticker>', methods=['GET', 'POST'])
def buy_stock(ticker):
    if 'user' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        quantity = int(request.form.get('quantity'))
        price = float(request.form.get('purchase_price'))
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute('INSERT INTO user_shares (user_email, ticker, quantity, purchase_price) VALUES (?, ?, ?, ?)',
                  (session['user'], ticker, quantity, price))
        conn.commit()
        conn.close()
        return redirect(url_for('portfolio'))
    return render_template("buy_stock.html", ticker=ticker)

@app.route('/portfolio')
def portfolio():
    if 'user' not in session:
        return redirect(url_for('login'))
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT ticker, quantity, purchase_price FROM user_shares WHERE user_email = ?', (session['user'],))
    shares = c.fetchall()
    conn.close()
    portfolio_data = []
    for ticker, qty, purchase_price in shares:
        stock = yf.Ticker(ticker)
        try:
            current_price = stock.info.get('regularMarketPrice')
            if not current_price:
                hist = stock.history(period="1d")
                current_price = hist['Close'].iloc[-1] if not hist.empty else 0
        except:
            current_price = 0

        profit_loss = round((current_price - purchase_price) * qty, 2)
        portfolio_data.append({
            'ticker': ticker,
            'name': stock.info.get('shortName', ticker),
            'quantity': qty,
            'purchase_price': purchase_price,
            'current_price': current_price,
            'profit_loss': profit_loss
        })
    return render_template('portfolio.html', stocks=portfolio_data, user=session['user'])

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

@app.route('/delete_stock/<ticker>', methods=['POST'])
def delete_stock(ticker):
    if 'user' not in session:
        return "Unauthorized", 403
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('DELETE FROM user_shares WHERE user_email = ? AND ticker = ?', (session['user'], ticker))
    conn.commit()
    conn.close()
    return "Deleted", 200

if __name__ == '__main__':
    app.run(debug=True)

