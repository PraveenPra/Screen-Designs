const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const locationButton = document.getElementById('locationButton');
const locationStatus = document.getElementById('locationStatus');
const locationDescription = document.getElementById('locationDescription');
const searchInput = document.getElementById('searchInput');
const statusIcons = document.querySelectorAll('.status-icon');
let isLocationOn = false;

locationButton.addEventListener('click', toggleLocation);
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (isLocationOn) {
            searchLocation();
        } else {
            locationButton.classList.add('shake');
            navigator.vibrate(200); // Vibrate for 200ms
            setTimeout(() => {
                locationButton.classList.remove('shake');
            }, 500);
        }
    }
});

function toggleLocation() {
    if ('geolocation' in navigator) {
        if (!isLocationOn) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    updateMap(latitude, longitude);

                    locationStatus.textContent = 'Your Current Location';
                    locationDescription.textContent = 'This is your current location on the map.';
                    locationButton.textContent = 'Turn off location';
                    statusIcons.forEach(icon => icon.classList.remove('off'));
                    statusIcons.forEach(icon => icon.classList.add('on'));
                    isLocationOn = true;
                },
                error => {
                    console.error(error.message);
                }
            );
        } else {
            resetMap();

            locationStatus.textContent = 'See places near you';
            locationDescription.textContent = 'To see a list of places kindly allow us to access your location while you use your app.';
            locationButton.textContent = 'Turn on location';
            statusIcons.forEach(icon => icon.classList.remove('on'));
            statusIcons.forEach(icon => icon.classList.add('off'));
            isLocationOn = false;
        }
    } else {
        console.error('Geolocation is not available in this browser.');
    }
}

function searchLocation() {
    const searchQuery = searchInput.value;

    if (searchQuery.trim() !== '') {
        fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const latitude = parseFloat(data[0].lat);
                    const longitude = parseFloat(data[0].lon);
                    updateMap(latitude, longitude);
                } else {
                    console.error('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
            });
    }
}

function updateMap(latitude, longitude) {
    map.setView([latitude, longitude], 15);
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Your Location').openPopup();
}

function resetMap() {
    map.setView([0, 0], 2);
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

function toggleTheme() {
    document.querySelectorAll('.moon, .sun, header,#card,body,input,p,#search-icon')
        .forEach(element => element.classList.toggle('dark-mode'));
}
