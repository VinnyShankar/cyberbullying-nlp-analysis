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
# Bar Chart API Route
#################################################
@app.route("/api/v1.0/barchart")
def barchartstatic():
    query = get_from_mongo().aggregate([{ "$group": { "_id": { "category": "$category", "score": "$score" },
             "count": { "$sum": 1 } } }])
    
    query2 = get_from_mongo().aggregate([{ "$group": {"_id": "$category", "count": { '$sum': 1 }}}])

    fields = {
        "_id": 0,
        "category": 1,
        "score": 1
    }
    result = (query,query2,fields)

    return dumps(result)



# Box Plot API Route
# @app.route("/api/v1.0/boxplot")
# def boxplot():
#     query = get_from_mongo().aggregate([
#         { "$group": {"_id": "$score", "count": {"$group": {"_id": {"category": "$category"}} "$sum": 1}}}
#         ])
#     # ([{ "$group": { "_id": { "score": "$score", "category": "$category" },
#     #          "count": { "$sum": 1 } } }])
    
#     # query2 = get_from_mongo().aggregate([{ "$group": {"_id": "$category", "count": { '$sum': 1 }}}])

#     fields = {
#         "_id": 0,
#         "category": 1,
#         "score": 1
#     }
#     result = (query,fields)

#     return dumps(result)




# Completing flask setup
if __name__ == '__main__':
    app.run(debug=True)