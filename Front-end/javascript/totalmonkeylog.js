import { API_BASE_URL } from './IPConfig.js';

function countUsers(monkeys) {
    const userSet = new Set();
    monkeys.forEach(monkey => {
        if (monkey.username) {
            userSet.add(monkey.username);
        }
    });
    return userSet.size;
}

async function loadTotalMonkeyLog() {
    const users = document.getElementById('users');
    const primates = document.getElementById('primates');
    const bananas = document.getElementById('bananas');

    if (!users) console.error('Users element not found');
    if (!primates) console.error('Monkeys element not found');
    if (!bananas) console.error('Bananas element not found');

    try {
        const response = await fetch(`${API_BASE_URL}/api/Monkey/all`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            users.innerHTML = `${response.status}`;
            primates.innerHTML = `${response.status}`;
            bananas.innerHTML = `${response.status}`;
            return;
        }

        const responseData = await response.json();

        // Clear any previous content
        users.innerHTML = countUsers(responseData).toString();
        primates.innerHTML = responseData.length.toString();
        bananas.innerHTML = '';

    } catch (err) {
        console.error('Error connecting to server:', err);
    }
}

loadTotalMonkeyLog();