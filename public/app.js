//global variable to store the logged-in user's username
let loggedInUsername = null;


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
        loggedInUsername = username;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('playerSelection').style.display = 'block';
        // Initialize the selectedPlayers array with the data from the server
        selectedPlayers = data.selectedPlayers;

        fetchPlayers();
        displaySelectedPlayers(selectedPlayers);
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

    // Display selected players in their respective slots
    selectedPlayerIds.forEach((id, index) => {
        const playerSlot = document.querySelector(`.playerSlot[data-index="${index}"]`);
        const player = allPlayers.find(player => player._id === id);
        playerSlot.textContent = player ? player.name : 'No player selected';
 
    });
}


// Event listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('showRegisterForm').addEventListener('click', () => {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
});

// Function to update the selected player for a given slot
function updateSelectedPlayer(index, playerId) {
    selectedPlayers[index] = playerId;
    displaySelectedPlayers(selectedPlayers);
}

document.querySelectorAll('.playerSlot').forEach(slot => {
    slot.addEventListener('click', () => {
        const index = slot.getAttribute('data-index');
        const selectedPlayerId = document.getElementById('playerDropdown').value;
        updateSelectedPlayer(index, selectedPlayerId);
    });
});

document.getElementById('updateTeam').addEventListener('click', async () => {
    const response = await fetch('/api/users/updateTeam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUsername, selectedPlayers }) // Assuming 'username' is the logged-in user's username
    });

    if (response.ok) {
        alert('Team updated successfully!');
    } else {
        alert('Error updating team');
    }
});
