window.onload = () => {
    const cachedData = sessionStorage.getItem("nasaData");
    if (cachedData) {
        const data = JSON.parse(cachedData);
        document.documentElement.style.setProperty('--bg-image', `url('${data.url}')`);
    }
};