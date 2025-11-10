const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const user_or_email = document.getElementById("user_or_email").value;
    const password = document.getElementById("password").value;

    const jsonData = {
        Username: user_or_email,
        Email: user_or_email,
        PasswordHash: password
    };

    console.log("JSON data:", jsonData); // For debugging

    try {
        const response = await fetch("https://192.168.12.110:7264/api/Users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
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

            console.log("Saved user_id:", responseData.userID);
            console.log("LocalStorage now contains:", localStorage.getItem("user_id"));

            window.location.replace("index.html");
        }
    } catch (err) {
        console.error("Error connecting to server:", err);
        document.getElementById("success").innerHTML = "Error connecting to server.";
    }
});
