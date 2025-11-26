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

    try {
        // Send JSON to the backend
        const response = await fetch("http://10.102.83.86:7264/api/Users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });
    
        const responseData = await response.json();
        console.log(responseData);
    
        if (!response.ok) { 
            // Account already taken or other server error
            console.error("Request failed: ", responseData.message);
            document.getElementById("success").innerHTML = `Error: ${responseData.message}`;
            return;
        }
    
        // Account successfully created, switch to home page
        document.getElementById("success").style.color = "#d1da49";
        document.getElementById("success").innerHTML = responseData.message; 
        setTimeout(() => {
            window.location.replace("index_logged_in.html");
        }, 2000);
    } catch (err) {
        // No response from server
        console.error("Error connecting to server:", err);
        document.getElementById("success").innerHTML = "Error connecting to server";
    }
});
