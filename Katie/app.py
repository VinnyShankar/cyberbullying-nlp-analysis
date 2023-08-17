# Flask app goes here
# import numpy as np
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


#################################################
# Connect to MongoDB and return project4.youtube_comments collection
#################################################
def get_from_mongo():
    client = MongoClient(port=27017)
    db = client.project4
    comments = db.youtube_comments
    return comments


#################################################
# Database Setup
#################################################
# engine = create_engine(f"postgresql+psycopg2://postgres:{postgres_key}@localhost/{db_name}")
# Connect to MongoDB and return health.mortality collection
# def get_from_mongo():
#     client = MongoClient(port=27017)
#     db = client.health
#     mortality = db.mortality
#     return mortality

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



# Bar Chart API Route
@app.route("/api/v1.0/barchart")
def barchart():
    query = {}
    fields = {
        "_id": 0,
        "comment": 0,
        "channel": 0,
        "video_url": 0,
        "video_id": 0,
        "expanded_text": 0,
        "processed_text": 0
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)





# Completing flask setup
if __name__ == '__main__':
    app.run(debug=True)