const form = document.getElementById("create-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload
    
    const user_id = 0;
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

    // Convert to JSON
    const jsonData = {
        user_id,
        name,
        continent,
        type,
        info
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
        // API is not okay, HTTP Code 3xx, 4xx, or 5xx.
        console.error("Request failed:", response.status);
        document.getElementById("success").innerHTML = `${response.status}`;
        return;
    }
    
    const responseData = await response.json();
    console.log(responseData);

    if (responseData.success == "false")
        // Monkey name already in use
        document.getElementById("success").innerHTML = "Monkey name already in use";
    else {
        // Monkey created!
        document.getElementById("success").style.color = "#d1da49";
        document.getElementById("success").innerHTML = "Monkey Created! Visit your monkey in the dashboard.";
    }
});