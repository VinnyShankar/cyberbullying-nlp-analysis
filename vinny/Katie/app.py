#################################################
# Dependencies
#################################################
from flask import Flask, jsonify, render_template, send_file
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
        "identity": 1,
        "score": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)

#################################################
# Wordcloud 1
#################################################

@app.route("/api/v1.0/wordcloud/<category>")
def wordsss(category):
    query = {"category":category}
    fields = {
        "_id": 0,
        "category": 1,
        "processed_text": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)

#################################################
# Wordcloud 2
#################################################

@app.route("/api/v1.0/wordclouds/<category>")
def wordzzz(category):
    filename = f"wordcloud_{category}.png"  
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