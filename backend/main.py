import uvicorn
import requests
import os
from openai import OpenAI
from dotenv import load_dotenv
import json
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLEMAPS_API_KEY')
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Middleware for handling CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model for the AI itinerary request
class UserRequest(BaseModel):
    userResponse: str

@app.post("/ai")
def getAIResponse(request: UserRequest):
    print(f"Received request: {request.userResponse}")
    client = OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=OPENAI_API_KEY
    )

    completion = client.chat.completions.create(
        model="deepseek-ai/deepseek-r1",
        messages=[{
            "role": "user",
            "content": (
                "Give me a travel itinerary for travelling based on the next sentence. "
                f"{request.userResponse}. "
                "Give me the answer in JSON, where the keys are the days and the values "
                "are the list of strings of the names of the locations. "
                "Don't include any text other than the JSON output. "
                "No matter what, give me 2 places per day."
            ),
        }],
        temperature=0.6,
        top_p=0.7,
        max_tokens=4096,
        stream=False
    )

    message_content = completion.choices[0].message.content
    json_start = message_content.find("{")
    json_end = message_content.rfind("}") + 1
    json_string = message_content[json_start:json_end]

    try:
        itinerary = json.loads(json_string)
        return itinerary
    except json.JSONDecodeError as error:
        print("Error parsing JSON:", error)
        return {"error": "Failed to parse AI response into JSON."}


# Model for the directions request
class LocationsRequest(BaseModel):
    locations: list[str]

@app.post("/get-directions")
async def get_directions(request: LocationsRequest):
    print("Fetching directions...")
    locations = request.locations
    if not locations or len(locations) < 2:
        return {"error": "Not enough locations provided."}

    origin = locations[0]
    destination = locations[-1]
    waypoints = locations[1:-1]

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}"
    if waypoints:
        waypoints_str = '|'.join(waypoints)
        url += f"&waypoints={waypoints_str}"

    url += f"&key={GOOGLE_MAPS_API_KEY}"

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        routes = data.get("routes", [])
        if not routes:
            return {"error": "No routes found."}

        # Extract the polyline overview path
        polyline = routes[0]["overview_polyline"]["points"]

        return {
            "polyline": polyline,
            "origin": origin,
            "destination": destination,
            "waypoints": waypoints
        }
    else:
        return {"error": f"Google Maps API error: {response.status_code}", "message": response.text}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

