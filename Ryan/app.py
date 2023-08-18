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



# Bar Chart API Route
@app.route("/api/v1.0/barchart")
def barchart():
    query = {}
    fields = {
        "_id": 0,
        "category": 1,
        "score": 1
    }
    result = get_from_mongo().find(query,fields)

    return dumps(result)





# Completing flask setup
if __name__ == '__main__':
    app.run(debug=True)