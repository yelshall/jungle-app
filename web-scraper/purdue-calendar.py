import requests
import unicodedata
from bs4 import BeautifulSoup as bs
import pymongo
from pymongo import MongoClient
from datetime import datetime

# Load the webpage content
r = requests.get("https://calendar.purdue.edu/calendar/EventList.aspx?fromdate=10/1/2021&todate=9/30/2022&display=Month&view=Category")

# Convert to a beautiful soup object
webpage = bs(r.content, "html.parser")

# Use BeautifulSoup select function to pull out the divs containing class vevent
links = webpage.select("div.vevent a")

# Grab only the portion of the url contained in the href class
hrefs = [link['href'] for link in links]

# Create a string that contains the shared url info
purdue_url = "https://calendar.purdue.edu/calendar/"

# Go through the href list and append the url to the prefix
actual_links = [purdue_url + href for href in hrefs]

# Use the set function to remove duplicate links
distinct_links = list(set(actual_links))

# Loop through each link in the list and grab the event information
event_list = []

# Loop through each link in the list and grab the event information
event_list = []

for link in distinct_links:
  # Request the HTML information from each link
  r = requests.get(link)
  event = bs(r.content, "html.parser")

  # Grab event information from HTML table <td> and store into its own list
  event_info = []
  tds = event.select("td.detailsview")

  # Loop through each table item, normalize the unicode characters, split spaces
  # and store as a list of strings
  for td in tds:
    current_info = td.text.replace("/>", "")
    norm_info = unicodedata.normalize("NFKD", current_info)
    norm_info2 = norm_info.replace("\r", " ").split()
    norm_info3 = ' '.join(norm_info2)
    event_info.append(norm_info3)
  
  # Remove the first elemenet of the event_info list to remove duplicates
  event_info.pop(0)
  event_info = [i for i in event_info if i]
  event_list.append(event_info)

# Go through each event link and get the title of the event
event_titles = []
for link in distinct_links:

  # Request the HTML information from each link
  r = requests.get(link)
  event = bs(r.content, "html.parser")

  # Grab event information from HTML table <td> and store into its own list
  tds = event.select("td.listheadtext b")
  
  for td in tds:
    event_titles.append(td.text)

# Open the database client and initialize the events database
client = MongoClient("mongodb+srv://yelshall:yyForever-53611@auth-test.p4buu.mongodb.net/db?retryWrites=true&w=majority")
db = client.db
events = db.events

# Loop through the list of events, store the event info JSON format, and then store to the database
for i in range(len(event_list)): 
  # Pull out the strings from the event list to store in JSON format
  current_title = event_titles[i]
  start_date = event_list[i][1]
  start_time = event_list[i][2]

  # Lists with a start time of All Day need to be handled differently
  if (start_time == "All Day"):
    start_time = "12:00 AM"
    end_time = "11:59 PM"
    end_date = event_list[i][4]
    description = event_list[i][5].replace("Event Description:", "")

    # See if an event has a location given. If it doesn't, set to a default value of Purdue
    if (5 + 1) < len(event_list[i]):
      location = event_list[i][6].replace("Location Information:", "")
    else:
      location = "Purdue"
  else:
    start_time = event_list[i][3]
    end_date = event_list[i][5]
    end_time = event_list[i][7]
    description = event_list[i][8].replace("Event Description:", "")
    if (8 + 1) < len(event_list[i]):
      location = event_list[i][9].replace("Location Information:", "")
    else:
      location = "Purdue"

  # Take care of any end times that don't end in a standard time format
  if end_time == "Midnight":
    end_time = "12:00 AM"
  elif end_time == "Noon":
    end_time = "12:00 PM"
  
  # Merge the dates and times into one string. Then use datetime.strptime() to convert the string into a Date object
  merge_starts = start_date + " " + start_time
  start_date_time = datetime.strptime(merge_starts, "%m/%d/%Y %I:%M %p")
  merge_ends = end_date + " " + end_time
  end_date_time = datetime.strptime(merge_ends, "%m/%d/%Y %I:%M %p")

  #Store the strings in JSON format, which would be a Dictionary
  event = {
      "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/1024px-Purdue_Boilermakers_logo.svg.png",
      "eventName" : current_title,
      "dateTime" : start_date_time,
      "endDateTime" : end_date_time,
      "location" : location,
      "description" : description
  }

  # Insert the event dictionary into the database
  post_id = events.insert_one(event).inserted_id