import os
import httpx
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

# 1. Load your secret NASA_API_KEY from the .env file
load_dotenv()
NASA_KEY = os.getenv("NASA_API_KEY")
print(f"DEBUG: NASA Key loaded: {NASA_KEY}")

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('index.html')


#View by date
@app.get("/fetch-date")
async def get_space_data(date: str):
    # This URL connects to the real NASA Astronomy Picture of the Day (APOD) API
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_KEY}&date={date}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        # We pass the real NASA data directly back to your frontend
        data= response.json()
        print(f"NASA response for {date}: {data}")
        return data
