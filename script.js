// --------------------
// WEATHER (Roermond)
// --------------------

async function loadWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.1942&longitude=5.9870&current_weather=true"
    );

    const data = await res.json();

    const temp = data.current_weather.temperature;
    const code = data.current_weather.weathercode;

    let weather = "Unknown";

    if (code === 0) weather = "Sunny";
    else if (code <= 3) weather = "Cloudy";
    else if (code <= 67) weather = "Rainy";
    else if (code <= 77) weather = "Snowy";
    else weather = "Stormy";

    document.getElementById("weather").innerText = weather;
    document.getElementById("temp").innerText = temp + "°C";

  } catch (e) {
    document.getElementById("weather").innerText = "Weather error";
    document.getElementById("temp").innerText = "";
  }
}

loadWeather();


// --------------------
// LAST.FM MUSIC + BACKGROUND
// --------------------

const LASTFM_USER = "revenqe2325";
const LASTFM_API_KEY = "f4a030613126bbfb978079bfd2b214b7";

let lastTrackName = "";

async function loadMusic() {
  try {
    const url =
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`;

    const res = await fetch(url);
    const data = await res.json();

    const track = data.recenttracks.track[0];

    const name = track.name;
    const artist = track.artist["#text"];

    const fullName = name + artist;

    document.getElementById("song").innerText =
      name + " - " + artist;

    // album image
    const image =
      track.image[track.image.length - 1]["#text"];

    // only update background if song changed
    if (fullName !== lastTrackName) {
      lastTrackName = fullName;

      if (image && image !== "") {
        document.body.style.backgroundImage =
          `url(${image})`;
      }
    }

  } catch (e) {
    document.getElementById("song").innerText =
      "Music unavailable";
  }
}

loadMusic();

// 🔥 UPDATED: every 3 seconds
setInterval(loadMusic, 3000);