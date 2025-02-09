import requests

# Your Google Maps API key
GOOGLE_MAPS_API_KEY = "AIzaSyBCjgmCKYqLvQQlSSu3nXlW6lpvTX4AkX8"

# Define origin, destination, and waypoints
origin = 'New York'
destination = 'Boston'
waypoints = ['Philadelphia', 'Hartford']

# Construct the URL for Google Maps Directions API
url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}"

# Add waypoints if there are any
if waypoints:
    waypoints_str = '|'.join(waypoints)
    url += f"&waypoints={waypoints_str}"

# Add the API key
url += f"&key={GOOGLE_MAPS_API_KEY}"

# Fetch the directions data
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Print the response data (directions in JSON format)
    directions_data = response.json()
    print(directions_data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)
