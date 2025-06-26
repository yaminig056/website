# newsapi_scraper.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

def get_latest_news(query, max_results=5):
    if not NEWS_API_KEY:
        print("❌ NEWS_API_KEY not found in environment.")
        return []

    url = (
        f"https://newsapi.org/v2/everything?"
        f"q={query}&"
        f"language=en&"
        f"sortBy=publishedAt&"
        f"pageSize={max_results}&"
        f"apiKey={NEWS_API_KEY}"
    )

    try:
        response = requests.get(url)
        if response.status_code == 200:
            articles = response.json().get('articles', [])
            return [{'title': a['title'], 'url': a['url']} for a in articles]
        else:
            print(f"❌ NewsAPI error: {response.status_code} - {response.text}")
            return []
    except Exception as e:
        print(f"❌ Exception during news fetch: {e}")
        return []
