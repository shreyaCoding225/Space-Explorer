const themeToggle = document.getElementById("mode");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});


const apiKey = typeof NASA_API_KEY !== 'undefined' ? NASA_API_KEY : 'DEMO_KEY';

async function getSpaceData() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
    );
    const data = await response.json();

    // 1. Check if the API returned an error (like a 403 or 429)
    if (data.error || !data.url) {
      console.error("NASA API Error:", data.error?.message || "Invalid Data");
      document.getElementById("about-name").innerText = "Cosmic Signal Lost";
      document.getElementById("about-desc").innerText = "Rate limit reached. Try again in an hour or check your API key.";
      return; // Stop here if data is bad
    }

    const picContainer= document.getElementById("pic");
    const imgTag= document.getElementById("apod-img");

    if (data.media_type === "video") {
      picContainer.innerHTML =
        `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%; height:100%;"></iframe>`;
    } else {
      // picContainer.innerHTML=`<img id="apod-img" src="${data.url}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">`;
      imgTag.src = data.url;
      imgTag.onload = () => {
        imgTag.style.display = "block";
      };
    }

    document.getElementById("about-name").innerText = data.title || "Unknown Discovery";
    document.getElementById("about-desc").innerText = data.explanation || "No description available.";
 
  } catch (error) {
    console.error("Connection error:", error);
    document.getElementById("about-name").innerText = "Offline";
    document.getElementById("about-desc").innerText = "Could not connect to the NASA servers.";
  }
}

getSpaceData();
