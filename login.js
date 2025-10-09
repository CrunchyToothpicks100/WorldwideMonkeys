const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent default page reload

    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    // Send JSON to the backend
    const response = await fetch("https://localhost:5014/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    });

    const result = await response.json();
    console.log(result);
});