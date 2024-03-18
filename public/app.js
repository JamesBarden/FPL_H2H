// Function to fetch players from the backend and populate the dropdown
async function fetchPlayers() {
    const response = await fetch('/api/players');
    const players = await response.json();

    // Get the dropdown element
    const dropdown = document.getElementById('playerDropdown');

    // Clear existing options
    dropdown.innerHTML = '';

    // Populate the dropdown with player names
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player._id; // Use the player's ID as the value
        option.textContent = player.name; // Display the player's name
        dropdown.appendChild(option);
    });
}

// Call the fetchPlayers function when the page loads
window.addEventListener('load', fetchPlayers);
