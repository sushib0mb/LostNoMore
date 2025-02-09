from fastapi import FastAPI
import uvicorn
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()
app = FastAPI()


@app.get("/hello")
async def root():
    return {"message": "Hello World"}

@app.post("/ai")
def getAIResponse(userResponse: str):
    client = OpenAI(
    base_url = "https://integrate.api.nvidia.com/v1",
    api_key = os.getenv("OPENAI_API_KEY")
    )
    
    completion = client.chat.completions.create(
    model="deepseek-ai/deepseek-r1",
    messages=[{"role":"user","content":"Give me the an travel itinerary for travelling based on the next sentence. {userResponse}. Give me the answer in the JSON, where the keys are the days and the values are the list of strings of the names of the locations. Don't include the other text other than the JSON output."}],
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
        return(itinerary)
    except json.JSONDecodeError as error:
        print("Error parsing JSON:", error)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)