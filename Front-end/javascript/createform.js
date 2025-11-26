const form = document.getElementById("create-form");


form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    var user_id = 0;
    try {
        user_id = localStorage.getItem("user_id");
    } catch (error) {
        console.log("Could not get user_id. User is not logged in.");
    }

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const continent = document.getElementById("continent").value;
    const type = document.getElementById("type").value;
    const info = document.getElementById("info").value.trim();

    console.log("Retrieved user_id from localStorage:", user_id);

    // Convert to JSON
    const jsonData = {
        Name: name,
        Continent: continent,
        Type: type,
        Info: info,
        UserId: parseInt(user_id) // <-- correct key name
    };


    try {
        // Send JSON to the backend
        const response = await fetch("http://10.102.83.86:7264/api/Monkey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            // API is not okay, HTTP Code 3xx, 4xx, or 5xx.
            console.error("Request failed:", response.status);
            document.getElementById("success").innerHTML = `${response.status}`;
            return;
        }

        const responseData = await response.json();
        console.log(responseData);

        // Monkey created!
        document.getElementById("success").style.color = "#d1da49";
        document.getElementById("success").innerHTML = "Monkey Created! Visit your monkey in the dashboard.";

    } catch (err) {
        // No response from server
        console.error("Error connecting to server:", err);
        document.getElementById("success").innerHTML = "Error connecting to server";
    }
});