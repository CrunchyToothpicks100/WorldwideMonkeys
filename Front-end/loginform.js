const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const user_or_email = document.getElementById("user_or_email").value;
    const password = document.getElementById("password").value;

    jsonData = {
		Username: user_or_email,
		Email: user_or_email,
        PasswordHash: password
    };

    console.log("JSON data:", jsonData); // For debugging

    // Send JSON to the backend
    const response = await fetch("https://localhost:7264/api/Users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    });

    if (!response.ok) {
        // API is not okay, HTTP Code 3xx, 4xx, or 5xx.
        console.error("Request failed:", response.status);
        document.getElementById("success").innerHTML = `Error: ${response.status}`;
        return;
    }
    
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.success == "false")
        // Username / Password not found
        document.getElementById("success").innerHTML = responseData.message;
    else {
        // Login succcesful! Store user_id locally and switch to home page
        document.getElementById("success").style.color = "#d1da49"
        document.getElementById("success").innerHTML = responseData.message;
        localStorage.setItem("user_id", responseData.userID);
		
		console.log("Saved user_id:", responseData.userID);
console.log("LocalStorage now contains:", localStorage.getItem("user_id"));

        window.location.replace("index.html");
    }
});