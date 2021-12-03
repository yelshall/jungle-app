## import library
import torch
import torch.nn as nn
import torch.nn.functional as F
from sklearn.metrics import matthews_corrcoef
import numpy as np
import pandas as pd
import pymongo
from pymongo import MongoClient
from sklearn.metrics import accuracy_score
## preprocess

#import util
DATABASE_ACCESS = "mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority"

def load_data(db,table):
    cluster = MongoClient(DATABASE_ACCESS)
    return pd.DataFrame(list(cluster[db][table].find()))

# return user data as dataframe
def get_users():
    return load_data("db","students")

# return events data as dataframe
def get_events():
    return load_data("db","events")

## get ids as numpy array
def get_events_id():
    return np.array(get_events()["_id"])
def get_users_id(df):
    return np.array(df["_id"])

# check if a events inside a diction's list
def is_in_dict(obj_user,obj_events,D):
    return D[obj_user].count(obj_events)==1

# use the df to build dislike/like events dictionary
def build_liked_dict(df):
    return df.set_index("_id").to_dict()["interestedEvents"]

# use the df to build dislike events dictionary
def build_disliked_dict(df):
    return df.set_index("_id").to_dict()["unlikedEvents"]

## model class
class MatrixFactorization():
    def __init__(self, n_users, n_events, n_factors): ## This will also take care of initilizing the weights
        self.n_users = n_users
        self.n_events = n_events
        self.n_factors = n_factors
        self.user_factors = torch.rand(n_users, n_factors, dtype=torch.float32,requires_grad=False)/n_factors
        self.event_factors = torch.rand(n_events, n_factors, dtype=torch.float32,requires_grad=False)/n_factors

## these 2 function compute the gradient regard to U and V
## it uses MSE
    def gradient_U(self, users, events, ratings, lambda_):
        # users is a list of user ids
        # events is a list of item ids
        y_hat = torch.sigmoid((self.user_factors[users,:] * self.event_factors[events,:]).sum(dim=1))
        # print("user_factors[users,:]",self.user_factors[users,:])
        # print("user_factors[1,2,3]: ", self.user_factors[[0,0,0],:])
        # print("users",users)
        return ((lambda_*self.user_factors[users,:].T - self.event_factors[events,:].T * (ratings - y_hat) * (ratings*n_0_labels + (1-ratings)*n_1_labels)/(n_0_labels+n_1_labels)).T)

    def gradient_V(self, users, events, ratings, lambda_):
        # users is a list of user ids
        # items is a list of item ids
        y_hat = torch.sigmoid( (self.user_factors[users,:] * self.event_factors[events,:]).sum(dim=1) )
        return ((lambda_*self.event_factors[events,:].T - self.user_factors[users,:].T * (ratings - y_hat) * (ratings*n_0_labels + (1-ratings)*n_1_labels)/(n_0_labels+n_1_labels)).T) 


## call func to process data
df_train = get_users()
liked_dict = build_liked_dict(df_train)
disliked_dict = build_disliked_dict(df_train)

train_data = []

for user in liked_dict:
    for event in liked_dict[user]:
        train_data.append([user,event,1])

for user in disliked_dict:
    for event in disliked_dict[user]:
        train_data.append([user,event,0])


train_data = pd.DataFrame(np.array(train_data),columns = ["user_id","event_id","rating"])
users, unique_user_ids = pd.factorize(train_data['user_id'])
events, unique_event_ids = pd.factorize(train_data['event_id'])
ratings = train_data['rating'].values
n_1_labels = np.sum(ratings)
n_0_labels = ratings.shape[0] - n_1_labels
ratings = ratings.astype('float32')


# Turn training data into torch tensors
torch_users = torch.tensor(users,dtype=torch.long)
torch_events = torch.tensor(events,dtype=torch.long)
torch_ratings = torch.tensor(ratings,dtype=torch.float32)

n_users = len(unique_user_ids)
n_events = len(unique_event_ids)
print(f'n_users = {n_users} n_events = {n_events}', flush=True)

## training
model = MatrixFactorization(n_users, n_events, n_factors=5)

epochs = 5000
learning_rate = 0.01
lambda_ = 0

for epoch in range(epochs):
    model.user_factors[torch_users,:] -= learning_rate * model.gradient_U(torch_users,torch_events,torch_ratings,lambda_)
    model.event_factors[torch_events,:] -= learning_rate * model.gradient_V(torch_users,torch_events,torch_ratings,lambda_)

    if epoch % 1000 == 0:
        with torch.no_grad():
            y_hat = torch.sigmoid((model.user_factors[torch_users,:] * model.event_factors[torch_events,:]).sum(dim=1))
            print(f'Loss: {(torch_ratings * torch.log(y_hat) + (1 - torch_ratings) * torch.log((1.-y_hat))).sum()}')
            print(y_hat)
            y_hat = y_hat.gt(0.5).numpy()
            
            print(f'Epoch {epoch+1} last Matthew\'s correlation coefficient {matthews_corrcoef(y_hat,ratings)}', flush=True)
            print("accuracy",accuracy_score(y_hat,ratings))

## write factors to mongodb
event_factors = model.event_factors
user_factors = model.user_factors
event_id = get_events_id()
user_id = get_users_id(df_train)

## event 
df_event_factors = pd.DataFrame(np.array(event_factors),columns=["e1","e2","e3","e4","e5"])
df_event_factors["event_id"] = event_id
dict_event_factors = df_event_factors.to_dict("record")

# ## user
df_user_factors = pd.DataFrame(np.array(user_factors),columns=["e1","e2","e3","e4","e5"])
df_user_factors["user_id"] = user_id
dict_user_factors = df_user_factors.to_dict("record")

DATABASE_ACCESS = "mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority"
cluster = MongoClient(DATABASE_ACCESS)
db_event_factors = cluster["db"]["event_factors"]
db_user_factors = cluster["db"]["user_factors"]
db_event_factors.remove({})
db_user_factors.remove({})
db_event_factors.insert_many(dict_event_factors)
db_user_factors.insert_many(dict_user_factors)
print("recommender executed, data saved inside database")