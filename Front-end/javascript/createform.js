import { API_BASE_URL } from './IPConfig.js';

const form = document.getElementById("create-form");

// helper to get selected option text
async function getSelectedText(selectElement) {
    return selectElement.options[selectElement.selectedIndex].text;
}

async function reachedMonkeyLimit(userId) {
    const MONKEY_LIMIT = 12;
    const status = document.getElementById("success");

    const response = await fetch(`${API_BASE_URL}/api/Monkey/user/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
        console.log(`Could not check monkey limit: ${response.status}`);
        return false;
    }
    
    const data = await response.json();

    const totalMonkeys = data.length;
    console.log(`User ${userId} has ${totalMonkeys} monkeys.`);

    return totalMonkeys >= MONKEY_LIMIT;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const status = document.getElementById("success");
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        status.innerHTML = 'Login Required';
        return;
    }
    
    if (await reachedMonkeyLimit(userId)) {
        status.innerHTML = 'Monkey limit reached. Please delete an existing monkey <br>before creating a new one.';
        return;
    }

    // Collect form data
    const name = document.getElementById("name").value.trim();
    const continent = await getSelectedText(document.getElementById("continent"));
    const type = await getSelectedText(document.getElementById("type"));
    const info = document.getElementById("info").value.trim();

    // Convert to JSON
    const jsonData = {
        Name: name,
        Continent: continent,
        Type: type,
        Info: info,
        UserId: parseInt(userId) // <-- correct key name
    };

    try {
        // Send JSON to the backend
        console.log("Sending monkey data to backend:", jsonData);

        const response = await fetch(`${API_BASE_URL}/api/Monkey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) {
            status.innerHTML = `Error: ${response.status}`;
            return;
        }

        const responseData = await response.json();
        console.log("Response data:", responseData);

        status.style.color = "#d1da49";
        status.innerHTML = "Monkey created! Visit your monkey in the dashboard, <br>or create another one.";

    } catch (err) {
        // No response from server
        console.error("Error connecting to server:", err);
        status.innerHTML = "Error connecting to server";
    }
});