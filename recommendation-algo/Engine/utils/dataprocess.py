# library to connect data base and pre process data
# return a score matrix in numpy form
## import dependency
import numpy as np
import pandas as pd
import pymongo
from pymongo import MongoClient
DATABASE_ACCESS = "mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority"
## connect to the mongo database and return target table as mongo collection
def connect_db(db,table):
    cluster = MongoClient(DATABASE_ACCESS)
    return cluster[db][table]

## load the database table into np array
## take mongo db as arguement
## return np array
def load_data(table):
    return np.array(list(table.find()))

print(type(connect_db("db","events")))
print(load_data(connect_db("db","events")))
## split data into train and test


## main function to call to process all the data
def data_process():
    return 0