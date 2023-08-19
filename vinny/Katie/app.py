# Flask app goes here

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, text

# from flask import Flask, jsonify, render_template
# import psycopg2
# from pathlib import Path
# Use hidden file to import postgres db pwd
# from config import postgres_key, db_name


#################################################
# Dependencies
#################################################
from flask import Flask, jsonify, render_template
from pymongo import MongoClient
from bson.json_util import dumps
import numpy as np
from PIL import Image
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
import matplotlib.pyplot as plt
from nltk.stem import WordNetLemmatizer
import pandas as pd


#################################################
# Connect to MongoDB and return project4.youtube_comments collection
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


#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():

    # Connecting to index.html static file
    return render_template("index.html")

#################################################
# Bar Chart API Route
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
        "identity": 1,
        "score": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)

#################################################
# Wordcloud
#################################################
@app.route("/api/v1.0/wordcloud")
def wordcloud():
    query = {}
    fields = {"id":0,
              "category":1,
              "processed_text":1}

    result = get_from_mongo().find(query,fields)
    result_df = pd.DataFrame(result)

    # Initialize Lemmatize
    wordnet_lem = WordNetLemmatizer()

    # Lemmatize processed text and join everything in a list
    result_df['text_lem'] = result_df['processed_text'].apply(wordnet_lem.lemmatize)
    all_words_lem = ' '.join([word for word in result_df['text_lem']])

    # Generate a word cloud image
    mask = np.array(Image.open("youtube.png"))
    stopwords = set(STOPWORDS)

    wordcloud_yt = WordCloud(height=708,
                              width=1024,
                              background_color="white",
                              mode="RGBA",
                              stopwords=stopwords,
                              mask=mask).generate(all_words_lem)

    # Create coloring from the image
    image_colors = ImageColorGenerator(mask)
    plt.figure(figsize=[20,20])
    plt.axis('off')
    plt.tight_layout(pad=0)
    plt.imshow(wordcloud_yt.recolor(color_func=image_colors), interpolation="bilinear")

    # Store visualization to file
    plt.savefig("yt_logo_unigram.png", format="png")

    return dumps(result)

# Completing flask setup
if __name__ == '__main__':
    app.run(debug=True)