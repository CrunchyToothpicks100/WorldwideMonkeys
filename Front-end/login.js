const loginForm = document.getElementById('login-form');


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        Username: document.getElementById('loginUser').value,
        Email: document.getElementById('loginEmail').value,
        PasswordHash: document.getElementById('loginPassword').value
    };

    console.log("Sending login data:", data); // Debug

    try {
        const response = await fetch('https://192.168.12.110:7264/api/Users/login', {
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