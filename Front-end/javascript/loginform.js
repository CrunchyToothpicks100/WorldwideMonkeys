const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const BYPASS_LOGIN = true;
    
    if (BYPASS_LOGIN) {
        // Bypass login for testing purposes
        localStorage.setItem("user_id", 9999);
        localStorage.setItem("username", "TestUser");
        window.location.replace("index_logged_in.html");
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
        const response = await fetch("http://10.102.83.86:7264/api/Users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            // 
            console.error("Request failed:", response.status);
            document.getElementById("success").innerHTML = `Error: ${response.status}`;
            return;
        }

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.success === "false") {
            document.getElementById("success").innerHTML = responseData.message;
        } else {
            document.getElementById("success").style.color = "#d1da49";
            document.getElementById("success").innerHTML = responseData.message;

            // Store user_id from API
            localStorage.setItem("user_id", responseData.userID);
            localStorage.setItem("username", responseData.username);

            console.log("Saved user_id:", responseData.userID);
            console.log("LocalStorage now contains:", localStorage.getItem("user_id"));

            setTimeout(() => {
                window.location.replace("index_logged_in.html");
            }, 2000);
        }
    } catch (err) {
        // No response from server
        console.error("Error connecting to server:", err);
        document.getElementById("success").innerHTML = "Error connecting to server.";
    }
});
