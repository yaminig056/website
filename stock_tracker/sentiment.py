from textblob import TextBlob

def analyze_sentiment(texts):
    total = 0
    for text in texts:
        total += TextBlob(text).sentiment.polarity
    if not texts:
        return 0, "Neutral"

    average = total / len(texts)
    if average > 0:
        label = "Positive"
    elif average < 0:
        label = "Negative"
    else:
        label = "Neutral"
    return average, label
