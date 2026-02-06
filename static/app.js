const themeToggle = document.getElementById("mode");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

//APOD

async function getInitialSpaceData() {
  const cachedData = sessionStorage.getItem("nasaData");
  
  if (cachedData) {
    updateUI(JSON.parse(cachedData), true);
    return;
  }

  try {
    const response = await fetch("/fetch-date?date=");
    const data = await response.json();

    if (data.error || !data.url) {
      handleError(data.error?.message || "Invalid Data");
      return;
    }

    sessionStorage.setItem("nasaData", JSON.stringify(data));
    updateUI(data, false); 

  } catch (error) {
    console.error("Connection error:", error);
    handleError("Could not connect to the mission control.");
  }
}

function handleError(message) {
  document.getElementById("about-name").innerText = "Cosmic Signal Lost";
  document.getElementById("about-desc").innerText = message;
  
  document.getElementById("apod-img").style.display = "none";
  document.getElementById("apod-video").style.display = "none";
}

getInitialSpaceData();




const modalOverlay = document.getElementById("date-modal-overlay");
const calendar = document.getElementById("calendar-input");
const launchBtn = document.getElementById("launch-date-btn");
const surpriseBtn = document.getElementById("Surprise");

function updateUI(data, shouldReset = true) {
    const imgEl = document.getElementById("apod-img");
    const videoEl = document.getElementById("apod-video");
    const titleEl = document.getElementById("about-name");
    const descEl = document.getElementById("about-desc");
    const loader = document.getElementById("loader");

    // Safety: If HTML is missing anything, stop here
    if (!imgEl || !videoEl || !titleEl || !descEl) return;

    // Reset UI state
    if (shouldReset) {
        imgEl.style.display = "none";
        videoEl.style.display = "none";
        imgEl.src = "";
        videoEl.src = "";
    }

    titleEl.innerText = data.title;
    descEl.innerText = data.explanation;
    loader.style.display = "block";

    if (data.media_type === "video") {
        imgEl.style.display = "none";
        videoEl.style.display = "block";
        videoEl.src = data.url;
        loader.style.display = "none";
    } else {
        videoEl.style.display = "none";
        videoEl.src = ""; 
        imgEl.src = data.url;
        
        // Show immediately if cached, otherwise wait for load
        if (imgEl.complete) {
            imgEl.style.display = "block";
            loader.style.display = "none";
        } else {
            imgEl.onload = () => { 
                imgEl.style.display = "block";
                loader.style.display = "none"; 
            };
        }
    }
}

//View by Date

launchBtn.addEventListener("click", async () => {
    const dateValue = calendar.value;
    if (!dateValue) return alert("Please select a date!");
    launchBtn.innerText = "Launching...";

    try {
        const response = await fetch(`/fetch-date?date=${dateValue}`);
        const data = await response.json();
        updateUI(data, true);
        modalOverlay.style.display = "none";
        launchBtn.innerText = "Explore";
    } catch (err) {
        launchBtn.innerText = "Error!";
    }
});

// MODAL CONTROLS
document.getElementById("bydate").addEventListener("click", (e) => {
    e.preventDefault();
    modalOverlay.style.display = "flex";
    calendar.focus();
    if (calendar.showPicker) {
        calendar.showPicker(); // Opens the calendar automatically
    }
});

document.getElementById("close-modal").addEventListener("click", () => {
    modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = "none";
});


//Surprise me!

surpriseBtn.addEventListener("click", async () => {
    surpriseBtn.innerText = "🌀 Shuffling...";
    try {
        const response = await fetch("/surprise");
        const data = await response.json();
        updateUI(data, true);
        surpriseBtn.innerText = "Surprise me!";
    } catch (err) {
        surpriseBtn.innerText = "Try Again";
    }
});


//Home
const homeBtn= document.getElementById('home');
homeBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    getInitialSpaceData();
});


//Learn more
const learnMore= document.getElementById('learnmore');
learnMore.addEventListener("click", (e)=>{
    e.preventDefault();
    window.open("/learn-more", "_blank");
});