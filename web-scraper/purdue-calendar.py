import requests
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

for link in distinct_links:
  # Request the HTML information from each link
  r = requests.get(link)
  event = bs(r.content, "html.parser")

  # Grab event information from HTML table <td> and store into its own list
  event_info = []
  tds = event.select("td.detailsview")

  # Loop through each table item, split newline characters from the table text, and append to info list
  for td in tds:
    current_info1 = td.text.replace("\n", "")
    #current_info2 = current_info1.replace("\xa", " ")
    event_info.append(current_info1)
  print(event_info)
  event_list.append(event_info)