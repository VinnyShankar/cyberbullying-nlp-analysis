# Machine Learning-Based Sentiment Analysis of YouTube Comments

## Authors
Jenna Barkley, Ryan Beebe, Hany Dief, Katie Djahan, Jed Miller, Vinny Shankar
## Dependencies
- This project requires a Python environment (version 3.7 and above)
- Run the `requirements.txt` file to install the necessary python packages
## Database Setup
- This project requires a MongoDB database.
- Installation instructions:
    - For Mac, please refer to https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
    - For Windows, please refer to https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
## How to deploy the Dashboard
- Establish a connection to the local MongoDB database
- Open a terminal
- Activate the environment in which all the dependencies are installed
- Run the `app.py` file in the code folder using the command `python app.py`
## Project Activity Summary
1. Created a list of YouTube videos in a CSV file
2. Harvested comments for the videos through the YouTube API
3. Created and optimize a machine learning model to process the comments and drop spam
4. Used the [roberta pre-trained model](https://huggingface.co/roberta-base) to label each comment as neutral, negative, or positive
5. Saved the cleaned and labeled comments in a JSON file and populated a local MongoDB database with the file
6. Used the cleaned and labeled comments to create and optimize four additional supervised learning models
7. Built a dashboard with a Python Flask API backend and JavaScript/HTML/CSS frontend
8. Used the MongoDB database to populate the dashboard
## Note
This is the best damn team to ever do a group project.