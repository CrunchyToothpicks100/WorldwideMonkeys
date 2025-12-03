import { API_BASE_URL } from './IPConfig.js';

// true: insert dummy cards for layout/testing
// false: fetch user's monkeys from API
const BYPASS_MONKEY_FETCH = false;

// Handle characters that will break HTML structure
function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function createMonkeyCard(monkey) {
    const card = document.createElement('div');
    card.className = 'monkey-card';
    card.dataset.monkeyId = monkey.id;

    const name = monkey.name;
    const type = monkey.type;
    const continent = monkey.continent;
    const info = monkey.info;
    const username = monkey.username;

    // See styles.css for monkey-card styling
    card.innerHTML = `
            <img class="monkey-image" src="assets/monkey_pics/${escapeHtml(type)}.jpg" alt="Monkey Image">
            <h3 class="monkey-name">${escapeHtml(name)}</h3>
            <div class="monkey-meta">${escapeHtml(type)} — ${escapeHtml(continent)}</div>
            <p class="monkey-info">
                <span class="monkey-info-text">${escapeHtml(info)}</span>
                <i class="fa-solid fa-pen-to-square edit-icon"></i>
            </p>
            <div class="monkey-owner">
                Created by: ${escapeHtml(username)}
                <i class="fa-solid fa-trash-can delete-icon"></i>
            </div>
        `;

    // Add click listener to the edit icon
    card.querySelector('.edit-icon').addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = card.dataset.monkeyId;
        await editMonkey(monkey);
    });

    // Add click listener to the delete icon
    card.querySelector('.delete-icon').addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = card.dataset.monkeyId;
        await deleteMonkey(monkey);
    });

    return card;
}

async function loadMonkeys() {
    const monkeyList = document.getElementById('monkey-list');
    const status = document.getElementById('success');
    if (status) console.log("Status element found");
    
    if (!monkeyList) return;

    // Dummy sample cards for testing layout
    if (BYPASS_MONKEY_FETCH) {
        console.log("Bypassing monkey fetch, inserting sample cards...");

        const sample = {
            Name: 'Jimmy (Sample)',
            Type: 'Leaf Monkey',
            Continent: 'South America',
            Info: 'Jimmy is blah blah blah...',
            Username: localStorage.getItem('username') || 'tester'
        };
        const sample2 = {
            Name: 'George (Sample)',
            Type: 'Orangutan',
            Continent: 'Asia',
            Info: 'George loves to swing from trees...',
            Username: localStorage.getItem('username') || 'tester'
        };
        monkeyList.appendChild(createMonkeyCard(sample));
        monkeyList.appendChild(createMonkeyCard(sample2));
        return;
    }

    try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            status.innerHTML = 'Login Required';
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/Monkey/user/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            status.innerHTML = `Error: ${response.status}`;
            return;
        }

        const responseData = await response.json();
        console.log('monkeys response:', responseData);

        if (!Array.isArray(responseData) || responseData.length === 0) {
            status.innerHTML = 'No monkeys found.';
            return;
        }

        // Clear any previous content
        monkeyList.innerHTML = '';

        responseData.forEach(m => {
            const card = createMonkeyCard(m);
            monkeyList.appendChild(card);
        });

    } catch (err) {
        console.error('Error connecting to server:', err);
        if (status) status.innerHTML = 'Error connecting to server';
    }
}

async function editMonkey(monkey) {
    const monkeyInfoText = document.querySelector(`div.monkey-card[data-monkey-id='${monkey.id}'] .monkey-info-text`);
    const newInfo = prompt("Edit monkey info:", monkeyInfoText.innerHTML);
    const status = document.getElementById('success');

    if (newInfo === null || newInfo.trim() === "") return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/monkey/${monkey.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Name: monkey.name,
                Continent: monkey.continent,
                Type: monkey.type,
                Info: newInfo.trim(),
                Username: monkey.username
            })
        });

        if (!response.ok) {
            status.innerHTML = `Error updating monkey: ${response.status}`;
            return;
        }

        if (status) {
            status.style.color = "#d1da49";
            status.innerHTML = "Monkey updated!";
        }
        monkeyInfoText.innerHTML = newInfo.trim();

    } catch (err) {
        console.error('Error connecting to server:', err);
        if (status) status.innerHTML = 'Error connecting to server';
    }
}

async function deleteMonkey(monkey) {
    if (!confirm(`Are you sure you want to delete "${monkey.name}"? This action cannot be undone.`)) {
        return;
    }

    const status = document.getElementById('success');
    const card = document.querySelector(`div.monkey-card[data-monkey-id='${monkey.id}']`);

    try {
        const response = await fetch(`${API_BASE_URL}/api/monkey/${monkey.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: monkey.id
            })
        });

        if (!response.ok) {
            status.innerHTML = `Error deleting monkey: ${response.status}`;
            return;
        }

        status.style.color = "#d1da49";
        status.innerHTML = "Monkey deleted!";
        setTimeout(() => { 
            card.remove();
        }, 1000);

    } catch (err) {
        console.error('Error connecting to server:', err);
        if (status) status.innerHTML = 'Error connecting to server';
    }
}

// Start
loadMonkeys();