mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

// Initialize the map with a default center (this could be changed to any other place)
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.0589, 42.3601], // Default: Boston
    zoom: 12
});

document.getElementById("send-btn").addEventListener("click", function() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Suggest 5 famous places to visit in Boston for: ${userInput}. Only return a comma-separated list.`,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        let places = data.choices[0].text.split(",").map(place => place.trim());
        chatBox.innerHTML += `<div><strong>AI:</strong> ${places.join(", ")}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        getCoordinatesAndPlot(places);
    })
    .catch(error => {
        chatBox.innerHTML += `<div><strong>AI:</strong> Sorry, I couldn't fetch a response.</div>`;
    });
});

function getCoordinatesAndPlot(places) {
    places.forEach(place => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length > 0) {
                let coord = data.features[0].center; // Coordinates are in [longitude, latitude]
                let latitude = coord[1];
                let longitude = coord[0];

                // Set the map center to the coordinates of the place
                map.setCenter([longitude, latitude]);
                map.setZoom(14); // Adjust zoom level based on preference (larger number = closer zoom)

                // Add a marker on the map at the location of the place
                new mapboxgl.Marker()
                    .setLngLat([longitude, latitude])
                    .setPopup(new mapboxgl.Popup().setHTML(`<strong>${place}</strong>`))
                    .addTo(map);
            }
        })
        .catch(error => console.error("Geocoding error:", error));
    });
}