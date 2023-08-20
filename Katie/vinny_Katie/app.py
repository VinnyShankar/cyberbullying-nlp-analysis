#################################################
# Dependencies
#################################################
from flask import Flask, render_template, send_file
from pymongo import MongoClient
from bson.json_util import dumps
# import numpy as np
# from PIL import Image
# from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
# import matplotlib.pyplot as plt
# from nltk.stem import WordNetLemmatizer
# import pandas as pd


#################################################
# Connect to MongoDB
#################################################
def get_from_mongo():
    client = MongoClient(port=27017)
    db = client.project4
    comments = db.youtube
    return comments

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

# cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})
# cache.init_app(app)

#################################################
# Render HTML
#################################################
@app.route("/")
def welcome():

    # Connecting to index.html static file
    return render_template("index.html")

#################################################
# Bar Chart data endpoint
#################################################

@app.route("/api/v1.0/barchart/<category>")
def barchart(category):
    query = {"category":category}
    fields = {
        "_id": 0,
        "category": 1,
        "score": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)

#################################################
# Stacked Bars
#################################################

@app.route("/api/v1.0/stackedbars")
def stackedbars():
    query = {}
    fields = {
        "_id": 0,
        "category": 1,
        "score": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)

#################################################
# Wordcloud 1
#################################################

# @app.route("/api/v1.0/wordcloud/<category>")
# @cache.cached(timeout=300)  # Cache for 5 minutes
# def wordsss(category):
#     query = {"category":category}
#     fields = {
#     "_id": 0,
#     "processed_text": 1
#     }
#     result = get_from_mongo().find(query,fields)
#     list_cur = list(result)
#     df = pd.DataFrame(list_cur)
#     wordnet_lem = WordNetLemmatizer()

#     # Lemmatize processed text and join everything in a list
#     df['text_lem'] = df['processed_text'].apply(wordnet_lem.lemmatize)
#     all_words_lem = ' '.join([word for word in df['text_lem']])

#     # Generate a word cloud image
#     mask = np.array(Image.open("youtube.png"))
#     stopwords = set(STOPWORDS)

#     wordcloud_yt = WordCloud(height=708,
#                                 width=1024,
#                                 background_color="white",
#                                 mode="RGBA",
#                                 stopwords=stopwords,
#                                 mask=mask).generate(all_words_lem)

#     # Create coloring from the image
#     image_colors = ImageColorGenerator(mask)
#     plt.figure(figsize=[20,20])
#     plt.axis('off')
#     plt.tight_layout(pad=0)
#     plt.imshow(wordcloud_yt.recolor(color_func=image_colors), interpolation="bilinear")

#     # Convert plot to PNG image
#     image_stream = BytesIO()
#     plt.savefig(image_stream, format="png")
#     image_stream.seek(0)

#     return Response(image_stream, content_type="image/png")

#################################################
# Wordcloud 2
#################################################

@app.route("/api/v1.0/wordclouds/<category>")
def wordzzz(category):
    filename = f"wordcloud_{category}.png"  
    return send_file(filename, mimetype="image/png")

#################################################
# Bigrams
#################################################

@app.route("/api/v1.0/bigrams")
def bigram():
    filename = f"bigram.png"  
    return send_file(filename, mimetype="image/png")

#################################################
# Bonus
#################################################
@app.route("/api/v1.0/bonus")
def dvd():
    return render_template("bonus.html")

#################################################
# Bonus 2
#################################################
@app.route("/api/v1.0/bonus2")
def shop():
    return render_template("bonus2.html")

# Completing flask setup
if __name__ == '__main__':
    app.run(debug=True)