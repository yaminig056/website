from GoogleNews import GoogleNews

def get_latest_news(query, max_results=5):
    googlenews = GoogleNews(lang='en', region='IN', period='7d', encode='utf-8')
    googlenews.clear()
    googlenews.search(query)
    return googlenews.result()[:max_results]
