const form = document.getElementById("new-account-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const Username = document.getElementById("user").value;
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;
    const conf_password = document.getElementById("conf-password").value;

    // Check for mismatched passwords
    if (Password !== conf_password) {
        document.getElementById("success").innerHTML = "Confirm password does not match";
        return;
    }

    const jsonData = {
        Email,
        Username,
        PasswordHash: Password
    };

    console.log("JSON data:", jsonData); // For debugging

    // Send JSON to the backend
    const response = await fetch("http://10.102.83.86:7264/api/Users/register", {
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

    if (responseData.success === false) {
        // Username or email already taken
        document.getElementById("success").innerHTML = responseData.message;
    } else {
        // Account successfully created, switch to login page
        document.getElementById("success").style.color = "#d1da49";
        document.getElementById("success").innerHTML = responseData.message;
        window.location.replace("login.html");
    }
});
