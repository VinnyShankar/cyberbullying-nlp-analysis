import pandas as pd
import time
from googleapiclient.discovery import build

data_file_df = pd.read_csv("YouTuber Sample List - Large Creators.csv")
data_file_df.head()




api_key = 'AIzaSyBRLh3Pm0qXQplElT9PiWWOZmwTwPG5Mb8'

# List of video ids
video_ids = ["k29J8rwjBCA","eNuPRJ3N8pY","r7qovpFAGrQ","DLOJKLQnssM"]

# Counter
counter = 1

for id in video_ids:

    # empty list for storing reply
    replies = []

    # creating youtube resource object
    youtube = build('youtube', 'v3',
                    developerKey=api_key)

    # retrieve youtube video results
    video_response=youtube.commentThreads().list(
    part='snippet',
    videoId=id
    ).execute()


  # iterate video response
    while video_response:

        # extracting required info
        # from each result object
        for item in video_response['items']:

            # Extracting comments
            comment = item['snippet']['topLevelComment']['snippet']['textOriginal']

            # Store reply is list
            replies.append(comment)

            # print comment with list of reply
            print(comment, end = '\n\n')

        # Again repeat
        if 'nextPageToken' in video_response and len(replies)<1000:
            video_response = youtube.commentThreads().list(
                    part = 'snippet',
                    videoId = id,
                    pageToken = video_response['nextPageToken']
                ).execute()
        else:
            break

    df = pd.DataFrame(replies, columns=["Text"])

    # Drop duplicates from text column
    df = df.drop_duplicates(subset = ['Text'],keep='first')

    # Droping rows with href URL
    df = df[df["Text"].str.contains(r'href=\S+') == False]

    # Droping rows with non English words
    df=df[df.Text.map(lambda x: x.isascii())]

    df.to_csv(f"comments_{counter}.csv",index=False)
    counter += 1