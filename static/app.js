const themeToggle = document.getElementById("mode");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

const apiKey = typeof NASA_API_KEY !== "undefined" ? NASA_API_KEY : "DEMO_KEY";

// APOD

async function getSpaceData() {
  const cachedData = sessionStorage.getItem("nasaData");
  if (cachedData) {
    renderUI(JSON.parse(cachedData));
    return;
  }

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
    );
    const data = await response.json();

    if (data.msg || data.error || !data.url) {
      handleError(data.error?.message || data.msg || "Invalid Data");
      return;
    }
    sessionStorage.setItem("nasaData", JSON.stringify(data));
    renderUI(data);
  } catch (error) {
    console.error("Connection error:", error);
    handleError("Could not connect to the NASA servers.");
  }
}

function renderUI(data) {
  const picContainer = document.getElementById("pic");
  picContainer.innerHTML =
    data.media_type === "video"
      ? `<iframe src="${data.url}" ...></iframe>`
      : `<img id="apod-img" src="${data.url}" ...>`;

  document.getElementById("about-name").innerText = data.title;
  document.getElementById("about-desc").innerText = data.explanation;
}

function handleError(message) {
  document.getElementById("about-name").innerText = "Cosmic Signal Lost";
  document.getElementById("about-desc").innerText = message;
  document.getElementById("pic").innerHTML = ""; // Clear broken icons
}

getSpaceData();

// View by Date

const modalOverlay = document.getElementById("date-modal-overlay");
const closeBtn = document.getElementById("close-modal");
const calendar = document.getElementById("calendar-input");
const launchBtn = document.getElementById("launch-date-btn");

//NEW: Click on background to close
modalOverlay.addEventListener("click", (event) => {
  // This checks if you clicked the actual overlay and NOT the box inside it
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

document.getElementById("bydate").addEventListener("click", (e) => {
  e.preventDefault();
  modalOverlay.style.display = "flex";

  calendar.focus();
  if (calendar.showPicker) {
    calendar.showPicker();
  }
});

closeBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

launchBtn.addEventListener("click", async () => {
  const dateValue = calendar.value;
  if (!dateValue) return alert("Please select a date!");

  launchBtn.innerText = "Launching...";

  try {
    const response = await fetch(`/fetch-date?date=${dateValue}`);
    const data = await response.json();

    if (data.error) {
      // If NASA sends an error, show that instead of 'undefined'
      alert("NASA Error: " + data.error.message);
      launchBtn.innerText = "Explore";
      return;
    }

    document.getElementById("about-name").innerText = data.title;
    document.getElementById("apod-img").src = data.url;
    document.getElementById("about-desc").innerText = data.explanation;

    modalOverlay.style.display = "none";
    launchBtn.innerText = "Explore";
  } catch (error) {
    console.error("Transmission failed:", error);
    launchBtn.innerText = "Error!";
  }
});
