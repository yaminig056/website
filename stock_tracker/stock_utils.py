import yfinance as yf

def get_stock_info(ticker):
    stock = yf.Ticker(ticker)
    return stock.info

def get_stock_price(ticker):
    stock = yf.Ticker(ticker)
    try:
        price = stock.history(period='1d')['Close'][-1]
        return round(price, 2)
    except:
        return None

def get_stock_history(ticker, period='6mo'):
    stock = yf.Ticker(ticker)
    return stock.history(period=period)
