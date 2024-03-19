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


// Function to handle login
async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json(); //get response data 
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('playerSelection').style.display = 'block';
        fetchPlayers();
        displaySelectedPlayers(data.selectedPlayers);
    } else {
        alert('Invalid credentials');
    }
}

// Function to handle registration
async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('Account created successfully. Please log in.');
        document.getElementById('registerSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    } else {
        alert('Error creating account');
    }
}

//displayed players selected by user.
async function displaySelectedPlayers(selectedPlayerIds) {
    const playersResponse = await fetch('/api/players');
    const allPlayers = await playersResponse.json();
    const selectedPlayersDiv = document.getElementById('selectedPlayers');

    // Clear existing content
    selectedPlayersDiv.innerHTML = '';

    // Display selected players or "No player selected" for empty slots
    selectedPlayerIds.forEach((id, index) => {
        const player = allPlayers.find(player => player._id === id);
        const playerElement = document.createElement('div');
        playerElement.textContent = player ? player.name : 'No player selected';
        selectedPlayersDiv.appendChild(playerElement);
    });
}


// Event listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('showRegisterForm').addEventListener('click', () => {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
});