// script.js
let map = L.map('map').setView([25.7617, -80.1918], 5); // Start at Miami, FL

// Add Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dummy hurricane data - Replace with live data from an API
let hurricanePaths = [
    {
        name: "Hurricane Ian",
        path: [[25.7617, -80.1918], [26.5, -79.8], [27.5, -79.2], [28.5, -78.8]],
        category: 4,
        windSpeed: "130 mph"
    },
    {
        name: "Hurricane Nicole",
        path: [[23.0, -75.0], [24.5, -74.5], [25.9, -74.2], [27.3, -74.1]],
        category: 2,
        windSpeed: "105 mph"
    }
];

// Add animated hurricane paths and event listeners
hurricanePaths.forEach(hurricane => {
    let polyline = L.polyline(hurricane.path, {
        color: 'red',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10',
        lineJoin: 'round'
    }).addTo(map);

    // Animate path
    polyline.on('mouseover', () => {
        polyline.setStyle({ color: 'yellow', opacity: 1 });
        document.getElementById('storm-info').innerHTML = `
            <strong>${hurricane.name}</strong><br>
            Category: ${hurricane.category}<br>
            Wind Speed: ${hurricane.windSpeed}
        `;
    });

    polyline.on('mouseout', () => {
        polyline.setStyle({ color: 'red', opacity: 0.7 });
        document.getElementById('storm-info').innerHTML = "Hover over a hurricane to see details.";
    });
});

// Fetch Live Data (Optional) - Example using NOAA Hurricane API or similar
async function fetchLiveHurricaneData() {
    try {
        let response = await fetch('https://api.example.com/hurricanes');
        let data = await response.json();
        // Process and map data here
    } catch (error) {
        console.error('Error fetching hurricane data:', error);
    }
}

fetchLiveHurricaneData();
