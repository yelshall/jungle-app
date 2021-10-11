import requests
import unicodedata
from bs4 import BeautifulSoup as bs

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