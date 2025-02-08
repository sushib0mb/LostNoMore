from fastapi import FastAPI
import uvicorn
import env
from openai import OpenAI

app = FastAPI()


@app.get("/hello")
async def root():
    return {"message": "Hello World"}

@app.get("/")
async def root():
    client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
    )

    completion = client.chat.completions.create(
    model="deepseek-ai/deepseek-r1",
    messages=[{"role":"user","content":"Which number is larger, 9.11 or 9.8?"}],
    temperature=0.6,
    top_p=0.7,
    max_tokens=4096,
    stream=False
    )





if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)