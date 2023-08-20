#################################################
# Dependencies
#################################################
from flask import Flask, render_template, send_file
from pymongo import MongoClient
from bson.json_util import dumps


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
        "category": 1,
        "score": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)


#################################################
# Wordclouds
#################################################
@app.route("/api/v1.0/wordclouds/<category>")
def wordzzz(category):
    filename = f"Img/wordcloud_{category}.png"  
    return send_file(filename, mimetype="image/png")


@app.route("/api/v1.0/lgbtwords")
def lgbt():
    filename = f"Img/wordcloud_lgbt.png"  
    return send_file(filename, mimetype="image/png")


#################################################
# Bigrams
#################################################
@app.route("/api/v1.0/negative")
def negative():
    filename = f"Img/negative_lgbt.png"  
    return send_file(filename, mimetype="image/png")


@app.route("/api/v1.0/positive")
def positive():
    filename = f"Img/positive_lgbt.png"  
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