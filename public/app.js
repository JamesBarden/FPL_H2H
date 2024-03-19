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
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('playerSelection').style.display = 'block';
        fetchPlayers();
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

// Event listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('showRegisterForm').addEventListener('click', () => {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
});