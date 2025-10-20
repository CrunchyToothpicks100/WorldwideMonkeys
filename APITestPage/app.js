console.log("JS loaded");

let currentUserId = null;

// ---------------- REGISTER ----------------
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Register form submitted");

    const data = {
        Username: document.getElementById("regUsername").value,
        Email: document.getElementById("regEmail").value,
        PasswordHash: document.getElementById("regPassword").value
    };

    try {
        const res = await fetch("https://localhost:7264/api/Users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log(result);
        document.getElementById("registerMessage").textContent = result.message || "Registered!";
    } catch (err) {
        console.error(err);
        document.getElementById("registerMessage").textContent = "Error registering user";
    }
});

// ---------------- LOGIN ----------------
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        Username: document.getElementById('loginUsername').value,
        Email: document.getElementById('loginEmail').value,
        PasswordHash: document.getElementById('loginPassword').value
    };

    console.log("Sending login data:", data); // Debug

    try {
        const response = await fetch('https://localhost:7264/api/Users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Login response:", result);

        document.getElementById('loginResult').textContent = result.message || JSON.stringify(result);

        if (response.ok) {
            localStorage.setItem('currentUserId', result.userID); // Save user ID for monkey creation
            alert('Login successful!');
        }

    } catch (err) {
        console.error(err);
        document.getElementById('loginResult').textContent = 'Error connecting to server.';
    }
});


// ---------------- CREATE MONKEY ----------------
const monkeyForm = document.getElementById('monkeyForm');

monkeyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('currentUserId');
    if (!userId) {
        alert('You must be logged in to create a monkey!');
        return;
    }

    const data = {
        Name: document.getElementById('monkeyName').value,
        Continent: document.getElementById('monkeyContinent').value,
        Type: document.getElementById('monkeyType').value,
        Info: document.getElementById('monkeyInfo').value,
        UserId: parseInt(userId) // associate with logged-in user
    };

    console.log("Sending monkey data:", data);

    try {
        const response = await fetch('https://localhost:7264/api/Monkey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Monkey creation response:", result);

        if (response.ok) {
            alert('Monkey created successfully!');
            monkeyForm.reset();
        } else {
            alert(`Error: ${result.message || JSON.stringify(result)}`);
        }
    } catch (err) {
        console.error(err);
        alert('Error connecting to server.');
    }
});

