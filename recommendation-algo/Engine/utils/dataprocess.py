# library to connect data base and pre process data
# return a score matrix in numpy form
## import dependency
from os import uname
import numpy as np
import pandas as pd
from pandas.core.indexes.base import Index
import pymongo
from pymongo import MongoClient
#import util
DATABASE_ACCESS = "mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority"

## connect to the mongo database and return target table as mongo collection
## load the database table into np array
## take mongo db as arguement
## return np array
def load_data(db,table):
    cluster = MongoClient(DATABASE_ACCESS)
    return pd.DataFrame(list(cluster[db][table].find()))

## input database name
## return user tf
def get_user():
    return load_data("MIDB","users")

## input 
## return 
def get_events():
    return load_data("MIDB","events")

## reconstruct df to 3 col: event_id, user_id, rating
## if interestedEvents id with user_id fit with 1
## if notInterestedEvents id with user_id fit with -1
## otherwise fit with 0

def reconstruct(users):
    rating = users[["_id","interestedEvents"]]
    users_ratings = pd.DataFrame(columns = get_events()["_id"], index = pd.Index(rating["_id"]))
    print(users_ratings)
    # each row correspond to a user rating
    #ies = list(rating["interestedEvents"])
    print(users_ratings.iloc[0:1,])
    return 1

print(reconstruct(get_user()))

## get full rating matrix of user and events
## if interested then mark as 1, if not mark as -1, if not reviewed mark as 0
## 3 col: event_id, user_id, rating
## input user table as dataframe
def get_rating_matrix(users):
    users_ratings = users[["_id","interestedEvents"]]
    return users_ratings

## split data into train and test
def split_data():
    return 0

## main function to call to process all the data
def data_process():
    return 0