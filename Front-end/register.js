const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Register form submitted");

    const data = {
        Username: document.getElementById("regUser").value,
        Email: document.getElementById("regEmail").value,
        PasswordHash: document.getElementById("regPassword").value
    };

    const confPassword = document.getElementById("regConfPassword");

    // Check for mismatched passwords
    if (PasswordHash !== confPassword) {
        document.getElementById("success").innerHTML = "Confirm password does not match";
        return;
    }

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