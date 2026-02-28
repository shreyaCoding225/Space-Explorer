# 🌌 Space Explorer: The Universal Dashboard

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NASA](https://img.shields.io/badge/NASA-blue?style=for-the-badge&logo=nasa)


A comprehensive exploration portal that integrates multiple NASA Open APIs to provide real-time astronomical data, planetary imagery, and celestial tracking. This project serves as a centralized hub for space enthusiasts to monitor the cosmos through live data streams.

Explore the Cosmos in Real-Time. > https://space-explorer-4a1y.onrender.com/

**Note**: This project is hosted on a free instance. If the link takes a moment to load, the server is just waking up!

---

### ✨ Features
* **Astronomy Picture of the Day (APOD)**: Daily high-resolution images and educational deep-dives from NASA scientists.
* **View by Date 📅**: Journey through time using a custom modal and date picker to fetch any entry from NASA's vast archive in real-time.
* **Surprise Me! 🎲**: A randomization feature that pulls unique entries from NASA's 30-year astronomical archive using count-based fetching.
* **Dual-Mode UI**: A seamless theme switcher that toggles between a "Deep Space" Dark Mode and a clean Light Mode.
* **Mars Rover Gallery**: Access to the latest imagery captured by the Curiosity, Opportunity, and Spirit rovers on the Martian surface.
* **Near-Earth Objects (NeoWs)**: Real-time tracking of asteroids passing near Earth, including size, velocity, and potential hazard levels.
* **Responsive Architecture**: A custom-built CSS system ensuring a seamless experience across Mobile, Tablet, and Desktop devices.

---

### 🛠️ Tech Stack
* **Backend**: FastAPI (Python), Uvicorn
* **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
* **Security**: Dotenv for environment variable management
* **Data Source**: NASA Open APIs (APOD, Mars Rover, NeoWs, EPIC)

---

### ⚙️ Installation & Setup
Since this project uses a private API key and a Python backend, follow these steps to get it running locally:

**1. Clone the Repository:**
```bash
git clone [https://github.com/shreyaCoding225/Space-Explorer.git](https://github.com/shreyaCoding225/Space-Explorer.git)
cd Space-Explorer
```

**2. Set Up Virtual Environment:**

```Bash
python -m venv fastapi-env
# Windows:
fastapi-env\Scripts\activate
# Mac/Linux:
source fastapi-env/bin/activate
pip install -r requirements.txt
```
**3. Configure API Key:**

Create a file named .env in the root directory.

Add your key from api.nasa.gov:

```Plaintext
NASA_API_KEY=YOUR_ACTUAL_KEY_HERE
```
Note: .env is automatically ignored by Git to keep your key secure.

**4. Launch the Mission:**

```Bash
uvicorn main:app --reload
```
Open your browser and navigate to http://127.0.0.1:8000.

---

### 🌐 Deployment on Render
This project is configured for seamless deployment as a Render Web Service:

Build Command: ```pip install -r requirements.txt```

Start Command: ```uvicorn main:app --host 0.0.0.0 --port $PORT```

Environment Variables: Add your ```NASA_API_KEY``` in the Render Dashboard under 'Environment'.