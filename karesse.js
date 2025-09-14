// World Clock - Karesse D'Souza
// Displays live time for major cities

const cities = [
    {
        id: 'pune',
        name: 'Pune, India',
        timeZone: 'Asia/Kolkata',
        latitude: 18.5204,
        longitude: 73.8567
    },
    {
        id: 'singapore',
        name: 'Singapore, Singapore',
        timeZone: 'Asia/Singapore',
        latitude: 1.3521,
        longitude: 103.8198
    },
    {
        id: 'manila',
        name: 'Manila, Philippines',
        timeZone: 'Asia/Manila',
        latitude: 14.5995,
        longitude: 120.9842
    },
    {
        id: 'losangeles',
        name: 'Los Angeles, CA, USA',
        timeZone: 'America/Los_Angeles',
        latitude: 34.0522,
        longitude: -118.2437
    },
    {
        id: 'cali',
        name: 'Cali, Colombia',
        timeZone: 'America/Bogota',
        latitude: 3.4516,
        longitude: -76.5320
    },
    {
        id: 'atlanta',
        name: 'Atlanta, GA, USA',
        timeZone: 'America/New_York',
        latitude: 33.7490,
        longitude: -84.3880
    },
    {
        id: 'london',
        name: 'London, UK',
        timeZone: 'Europe/London',
        latitude: 51.5074,
        longitude: -0.1278
    }
];

// Weather code mapping for Open-Meteo
const weatherCodeMap = {
    0: { icon: '☀️', desc: 'Clear sky' },
    1: { icon: '🌤️', desc: 'Mainly clear' },
    2: { icon: '⛅', desc: 'Partly cloudy' },
    3: { icon: '☁️', desc: 'Overcast' },
    45: { icon: '🌫️', desc: 'Fog' },
    48: { icon: '🌫️', desc: 'Depositing rime fog' },
    51: { icon: '🌦️', desc: 'Light drizzle' },
    53: { icon: '🌦️', desc: 'Moderate drizzle' },
    55: { icon: '🌦️', desc: 'Dense drizzle' },
    56: { icon: '🌦️', desc: 'Light freezing drizzle' },
    57: { icon: '🌦️', desc: 'Dense freezing drizzle' },
    61: { icon: '🌧️', desc: 'Slight rain' },
    63: { icon: '🌧️', desc: 'Moderate rain' },
    65: { icon: '🌧️', desc: 'Heavy rain' },
    66: { icon: '🌧️', desc: 'Light freezing rain' },
    67: { icon: '🌧️', desc: 'Heavy freezing rain' },
    71: { icon: '🌨️', desc: 'Slight snow fall' },
    73: { icon: '🌨️', desc: 'Moderate snow fall' },
    75: { icon: '🌨️', desc: 'Heavy snow fall' },
    77: { icon: '🌨️', desc: 'Snow grains' },
    80: { icon: '🌦️', desc: 'Slight rain showers' },
    81: { icon: '🌦️', desc: 'Moderate rain showers' },
    82: { icon: '🌦️', desc: 'Violent rain showers' },
    85: { icon: '🌨️', desc: 'Slight snow showers' },
    86: { icon: '🌨️', desc: 'Heavy snow showers' },
    95: { icon: '⛈️', desc: 'Thunderstorm' },
    96: { icon: '⛈️', desc: 'Thunderstorm with slight hail' },
    99: { icon: '⛈️', desc: 'Thunderstorm with heavy hail' }
};

function fetchWeatherAndSun(city) {
    // Weather
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;
    // Sunrise/Sunset
    const sunUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&daily=sunrise,sunset&timezone=auto`;

    // Fetch weather
    fetch(weatherUrl)
        .then(res => res.json())
        .then(data => {
            const weather = data.current_weather;
            const weatherIconElem = document.querySelector(`#${city.id} .weather-icon`);
            const weatherTempElem = document.querySelector(`#${city.id} .weather-temp`);
            const weatherDescElem = document.querySelector(`#${city.id} .weather-desc`);
            if (weather && weatherIconElem && weatherTempElem && weatherDescElem) {
                const code = weather.weathercode;
                const map = weatherCodeMap[code] || { icon: '', desc: 'Unknown' };
                weatherIconElem.textContent = map.icon;
                weatherTempElem.textContent = `${weather.temperature}°C`;
                weatherDescElem.textContent = map.desc;
            } else {
                weatherIconElem.textContent = '';
                weatherTempElem.textContent = '';
                weatherDescElem.textContent = 'Weather unavailable';
            }
        })
        .catch(() => {
            const weatherIconElem = document.querySelector(`#${city.id} .weather-icon`);
            const weatherTempElem = document.querySelector(`#${city.id} .weather-temp`);
            const weatherDescElem = document.querySelector(`#${city.id} .weather-desc`);
            if (weatherIconElem && weatherTempElem && weatherDescElem) {
                weatherIconElem.textContent = '';
                weatherTempElem.textContent = '';
                weatherDescElem.textContent = 'Weather unavailable';
            }
        });

    // Fetch sunrise/sunset
    fetch(sunUrl)
        .then(res => res.json())
        .then(data => {
            const sunriseElem = document.querySelector(`#${city.id} .weather-sunrise`);
            const sunsetElem = document.querySelector(`#${city.id} .weather-sunset`);
            if (data.daily && data.daily.sunrise && data.daily.sunset && sunriseElem && sunsetElem) {
                // Only show today's sunrise/sunset
                sunriseElem.textContent = `Sunrise: ${data.daily.sunrise[0].slice(11, 16)}`;
                sunsetElem.textContent = `Sunset: ${data.daily.sunset[0].slice(11, 16)}`;
            } else {
                sunriseElem.textContent = 'Sunrise: --';
                sunsetElem.textContent = 'Sunset: --';
            }
        })
        .catch(() => {
            const sunriseElem = document.querySelector(`#${city.id} .weather-sunrise`);
            const sunsetElem = document.querySelector(`#${city.id} .weather-sunset`);
            if (sunriseElem && sunsetElem) {
                sunriseElem.textContent = 'Sunrise: --';
                sunsetElem.textContent = 'Sunset: --';
            }
        });
}

// City images for carousel
const cityImages = {
    pune: [
        { src: 'assets/pune1_shaniwar.jpeg', caption: 'Shaniwar Wada' },
        { src: 'assets/pune2_iskon.jpg', caption: 'ISKCON Temple' },
        { src: 'assets/pune3_mughalgarden.jpg', caption: 'Mughal Garden' }
    ],
    singapore: [
        { src: 'assets/singapore1_marinabay.jpeg', caption: 'Marina Bay Sands' },
        { src: 'assets/singapore2_silosobeach.jpg', caption: 'Siloso Beach' },
        { src: 'assets/singapore3_merlionpark.jpeg', caption: 'Merlion Park' }
    ],
    manila: [
        { src: 'assets/manila1_islandtrails.png', caption: 'Island Trails' },
        { src: 'assets/manila2_metro.jpg', caption: 'Metro Manila' },
        { src: 'assets/manila2_pasigriver.webp', caption: 'Pasig River' }
    ],
    losangeles: [
        { src: 'assets/LA1_cali.png', caption: 'Cali District' },
        { src: 'assets/LA2_downtown.png', caption: 'Downtown Los Angeles' },
        { src: 'assets/LA3_Hollywood.jpg', caption: 'Hollywood' }
    ],
    cali: [
        { src: 'assets/cali1_jesus_statue.jpg', caption: 'Cristo Rey' },
        { src: 'assets/cali2_laferiafestival.jpg', caption: 'La Feria Festival' },
        { src: 'assets/cali3_ValleDelCauca.png', caption: 'Valle Del Cauca' }
    ],
    atlanta: [
        { src: 'assets/atlanta1_skyline.jpg', caption: 'Atlanta Skyline' },
        { src: 'assets/atlanta2_piedmontpark.jpg', caption: 'Piedmont Park' },
        { src: 'assets/atlanta3_peachtreeStreet.png', caption: 'Peachtree Street' }
    ],
    london: [
        { src: 'assets/london1_bigben.jpg', caption: 'Big Ben' },
        { src: 'assets/london2_towerbridge.png.webp', caption: 'Tower Bridge' },
        { src: 'assets/london3_buckinghamPalace.png', caption: 'Buckingham Palace' }
    ]
};

let is24HourFormat = true;

function formatTime(date, timeZone, use24Hour) {
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24Hour,
        timeZone: timeZone
    }).format(date);
}

function updateTimes() {
    const now = new Date();
    cities.forEach(city => {
        const timeElem = document.querySelector(`#${city.id} .city-time`);
        if (timeElem) {
            timeElem.textContent = formatTime(now, city.timeZone, is24HourFormat);
        }
    });
}

function updateWeatherAndSunAll() {
    cities.forEach(city => fetchWeatherAndSun(city));
}

// Carousel modal logic
let currentCity = null;
let currentImageIndex = 0;

function openImageModal(cityId) {
    currentCity = cityId;
    currentImageIndex = 0;
    const modal = document.getElementById('image-modal');
    const imgElem = modal.querySelector('.carousel-img');
    const indicators = modal.querySelector('.carousel-indicators');
    const captionElem = modal.querySelector('.image-caption');
    const images = cityImages[cityId] || [];
    if (images.length === 0) return;
    imgElem.src = images[0].src;
    imgElem.alt = `${cityId} image 1`;
    captionElem.textContent = images[0].caption;
    updateIndicators(indicators, images.length, 0);
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    imgElem.focus();
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function showImage(index) {
    const modal = document.getElementById('image-modal');
    const imgElem = modal.querySelector('.carousel-img');
    const indicators = modal.querySelector('.carousel-indicators');
    const captionElem = modal.querySelector('.image-caption');
    const images = cityImages[currentCity] || [];
    if (images.length === 0) return;
    currentImageIndex = (index + images.length) % images.length;
    imgElem.src = images[currentImageIndex].src;
    imgElem.alt = `${currentCity} image ${currentImageIndex + 1}`;
    captionElem.textContent = images[currentImageIndex].caption;
    updateIndicators(indicators, images.length, currentImageIndex);
}

function updateIndicators(container, count, activeIndex) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === activeIndex ? ' active' : '');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Go to image ${i + 1}`);
        dot.addEventListener('click', () => showImage(i));
        container.appendChild(dot);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimes();
    setInterval(updateTimes, 1000);
    updateWeatherAndSunAll();

    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.toggle-icon');

    // Always start in dark theme
    body.classList.remove('light-theme');
    icon.textContent = '🌙';

    themeToggle.addEventListener('click', () => {
        const isLight = body.classList.toggle('light-theme');
        icon.textContent = isLight ? '☀️' : '🌙';
    });

    // Format toggle switch logic (no checkbox)
    const formatToggleSwitch = document.getElementById('format-toggle-switch');
    const label12 = document.querySelector('.switch-label-12');
    const label24 = document.querySelector('.switch-label-24');
    const slider = formatToggleSwitch.querySelector('.slider');

    // Helper to update UI
    function updateFormatSwitchUI() {
        if (is24HourFormat) {
            slider.classList.add('active-24');
            slider.classList.remove('active-12');
            label24.classList.add('active');
            label12.classList.remove('active');
        } else {
            slider.classList.add('active-12');
            slider.classList.remove('active-24');
            label12.classList.add('active');
            label24.classList.remove('active');
        }
    }
    updateFormatSwitchUI();

    formatToggleSwitch.addEventListener('click', () => {
        is24HourFormat = !is24HourFormat;
        updateFormatSwitchUI();
        updateTimes();
    });

    // Attach event listeners to 'View on Map' buttons
    document.querySelectorAll('.view-map-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const cityId = btn.getAttribute('data-city');
            const city = cities.find(c => c.id === cityId);
            if (city && city.latitude && city.longitude) {
                const url = `https://www.google.com/maps?q=${city.latitude},${city.longitude}`;
                window.open(url, '_blank');
            }
        });
    });

    document.querySelectorAll('.view-images-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const cityId = btn.getAttribute('data-city');
            openImageModal(cityId);
        });
    });
    const modal = document.getElementById('image-modal');
    modal.querySelector('.image-modal-close').addEventListener('click', closeImageModal);
    modal.querySelector('.image-modal-overlay').addEventListener('click', closeImageModal);
    modal.querySelector('.carousel-prev').addEventListener('click', function() {
        showImage(currentImageIndex - 1);
    });
    modal.querySelector('.carousel-next').addEventListener('click', function() {
        showImage(currentImageIndex + 1);
    });
    document.addEventListener('keydown', function(e) {
        if (modal.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        }
    });
});
