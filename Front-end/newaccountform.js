const form = document.getElementById("new-account-form");

<<<<<<< HEAD

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const Username = document.getElementById("user").value;
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;
    const conf_password = document.getElementById("conf-password").value;

    // Check for mismatched passwords
    if (Password !== conf_password) {
=======
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const conf_password = document.getElementById("conf-password").value;

    // Check for mismatched passwords
    if (password !== conf_password) {
>>>>>>> parent of e557e56 (better integration with back-end)
        document.getElementById("success").innerHTML = "Confirm password does not match";
        return;
    }

    jsonData = {
<<<<<<< HEAD
        Username,
        Email,
        PasswordHash: Password
=======
        user,
        email,
        password,
>>>>>>> parent of e557e56 (better integration with back-end)
    };

    console.log("JSON data:", jsonData); // For debugging

    // Send JSON to the backend
<<<<<<< HEAD
    const response = await fetch("https://192.168.12.110:7264/api/Users/register", {
=======
    const response = await fetch("https://localhost:5014/api/Users/register", {
>>>>>>> parent of e557e56 (better integration with back-end)
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
        document.getElementById("success").style.color = "#d1da49"
        document.getElementById("success").innerHTML = responseData.message;
        window.location.replace("login.html");
    }
});