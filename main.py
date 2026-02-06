import os
import httpx
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from fastapi.responses import Response

# 1. Load your secret NASA_API_KEY from the .env file
load_dotenv()
NASA_KEY = os.getenv("NASA_API_KEY")
# print(f"DEBUG: NASA Key loaded: {NASA_KEY}")

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('index.html')


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(content="", media_type="image/x-icon")

#View by date
@app.get("/fetch-date")
async def get_space_data(date: str):
    # This URL connects to the real NASA Astronomy Picture of the Day (APOD) API
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_KEY}&date={date}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        # We pass the real NASA data directly back to your frontend
        data= response.json()
        # print(f"NASA response for {date}: {data}")
        return data
    

#Surprise me!
@app.get('/surprise')
async def get_surprise():
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_KEY}&count=1"  #returns a list of count no. of objects
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()[0]


# Learn more
@app.get('/learn-more')
def get_learn_more():
    return FileResponse('./learn_more.html')