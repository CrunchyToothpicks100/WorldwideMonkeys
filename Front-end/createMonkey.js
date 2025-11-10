const monkeyForm = document.getElementById('create-form');

monkeyForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('currentUserId');
    if (!userId) {
        alert('You must be logged in to create a monkey!');
        return;
    }

    const data = {
        Name: document.getElementById('monkeyName').value,
        Continent: document.getElementById('monkeyContinent').value,
        Type: document.getElementById('monkeyType').value,
        Info: document.getElementById('monkeyInfo').value,
        UserId: parseInt(userId) // associate with logged-in user
    };

    console.log("Sending monkey data:", data);

    try {
        const response = await fetch('https://localhost:7264/api/Monkey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Monkey creation response:", result);

        if (response.ok) {
            alert('Monkey created successfully!');
            monkeyForm.reset();
        } else {
            alert(`Error: ${result.message || JSON.stringify(result)}`);
        }
    } catch (err) {
        console.error(err);
        alert('Error connecting to server.');
    }
});