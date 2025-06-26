# send_email.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv('EMAIL')
EMAIL_PASSWORD = os.getenv('EMAIL_PASS')

def send_sentiment_email(to_email, ticker, sentiment):
    subject = f"Stock Sentiment Alert for {ticker}"

    if sentiment == 'Positive':
        action = "📈 Positive sentiment. You may want to HOLD or SELL at a profit."
    elif sentiment == 'Negative':
        action = "📉 Negative sentiment. Consider selling your shares."
    else:
        action = "⚖️ Neutral sentiment. No strong action required."

    message = f"""
    <html>
        <body>
            <h2>Stock Alert for {ticker}</h2>
            <p>📊 Sentiment: <strong>{sentiment}</strong></p>
            <p>{action}</p>
        </body>
    </html>
    """

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(message, 'html'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            print(f"✅ Sent email to {to_email}")
    except Exception as e:
        print(f"❌ Failed to send email to {to_email}: {e}")
