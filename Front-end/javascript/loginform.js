const form = document.getElementById("login-form");

const BYPASS_LOGIN = false;  // Toggle to bypass login for testing purposes

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    console.log("Login form submitted");

    // Dummy login
    if (BYPASS_LOGIN) {
        console.log("Bypassing login...");
        document.getElementById("success").style.color = "#d1da49";
        document.getElementById("success").innerHTML = "Login successful! Redirecting...";

        localStorage.setItem("user_id", 9999);
        localStorage.setItem("username", "TestUser");

        setTimeout(() => {
            window.location.replace("index_logged_in.html");
        }, 1000);

        return;
    }

    const user_or_email = document.getElementById("user_or_email").value;
    const password = document.getElementById("password").value;

    const jsonData = {
        Username: user_or_email,
        Email: user_or_email,
        PasswordHash: password
    };

    console.log("JSON data:", jsonData); // For debugging

    try {
        const response = await fetch(`${API_BASE_URL}/api/Users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            // Bad request (400) Invalid username/password (401)
            console.error("Request failed:", response.status);
            if (response.status === 401) {
                document.getElementById("success").innerHTML = "Invalid username or password";
            } else {
                document.getElementById("success").innerHTML = `Error ${response.status}`;
            }
            return;
        }

        // Login successful
        const responseData = await response.json();
        console.log(responseData);
        
        document.getElementById("success").style.color = "#d1da49";
        document.getElementById("success").innerHTML = responseData.message;

        // Store user_id from API
        localStorage.setItem("user_id", responseData.userID);
        localStorage.setItem("username", responseData.username);

        console.log("Saved user_id:", responseData.userID);
        console.log("Saved username:", responseData.username);

        setTimeout(() => {
            window.location.replace("index_logged_in.html");
        }, 2000);

    } catch (err) {
        // No response from server
        console.error("Error connecting to server:", err);
        document.getElementById("success").innerHTML = "Error connecting to server";
    }
});
