**🌌 Space Explorer: The Universal Dashboard**
A comprehensive exploration portal that integrates multiple NASA Open APIs to provide real-time astronomical data, planetary imagery, and celestial tracking. This project serves as a centralized hub for space enthusiasts to monitor the cosmos through live data streams.

**✨ Features**
•	Astronomy Picture of the Day (APOD): Daily high-resolution images and educational deep-dives from NASA scientists.
•	Surprise Me! 🎲: A randomization feature that pulls unique entries from NASA's 30-year astronomical archive using count-based fetching.
•	Dual-Mode UI: A seamless theme switcher that toggles between a "Deep Space" Dark Mode and a clean Light Mode.
•	Mars Rover Gallery: Access to the latest imagery captured by the Curiosity, Opportunity, and Spirit rovers on the Martian surface.
•	Near-Earth Objects (NeoWs): Real-time tracking of asteroids passing near Earth, including size, velocity, and potential hazard levels.
•	Responsive Architecture: A custom-built CSS system ensuring a seamless experience across Mobile, Tablet, and Desktop devices.

**🛠️ Tech Stack**
	Frontend: HTML5, CSS3 (Flexbox, Custom Variables, Media Queries)
	Logic: JavaScript (ES6+) using Async/Await and Fetch API
	Data Source: NASA Open APIs (APOD, Mars Rover, NeoWs, EPIC)

**⚙️ Installation & Setup**
Since this project uses a private API key, follow these steps to get it running locally:

1.	Clone the Repository:
Bash
git clone https://github.com/shreyaCoding225/Space-Explorer.git
cd Space-Explorer

2.	Configure API Key:
•	Create a file named config.js in the root directory.
•	Get your free key at api.nasa.gov.
•	Add your key to config.js:
JavaScript
const NASA_API_KEY = "YOUR_NASA_API_KEY_HERE";
Note: config.js is automatically ignored by Git to keep your key secure.

3.	Launch: Open index.html in your browser.
