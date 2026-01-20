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
    const picContainer= document.getElementById("pic");
    const imgTag= document.getElementById("apod-img");

    if (data.media_type === "video") {
      picContainer.innerHTML =
        `<iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%; height:100%;"></iframe>`;
    } else {
      imgTag.src = data.url;
      imgTag.style.display = "block";
    }

    document.getElementById("about-name").innerText = data.title;
    document.getElementById("about-desc").innerText = data.explanation;
  } catch (error) {
    console.error("Connection error:", error);
  }
}

getSpaceData();
