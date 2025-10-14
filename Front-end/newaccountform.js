const form = document.getElementById("new-account-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const conf_password = document.getElementById("conf-password").value;

    // Check for mismatched passwords
    if (password !== conf_password) {
        document.getElementById("success").innerHTML = "Confirm password does not match";
        return;
    }

    jsonData = {
        user,
        email,
        password,
    };

    console.log("JSON data:", jsonData); // For debugging

    // Send JSON to the backend
    const response = await fetch("https://localhost:5014/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    });

    if (!response.ok) {
        // API issues
        console.error("Request failed:", response.status);
        document.getElementById("success").innerHTML = `Error: ${response.status}`;
        return;
    }

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.success == false) {
        // Username or email already taken
        document.getElementById("success").innerHTML = responseData.message;
    }
    else { 
        // Account successfully created, switch to login page
        document.getElementById("success").innerHTML = responseData.message;
        window.location.replace("login.html");
    }
});