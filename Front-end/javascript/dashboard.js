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

    const name = monkey.name;
    const type = monkey.type;
    const continent = monkey.continent;
    const info = monkey.info;
    const username = monkey.username;

    card.innerHTML = `
            <img class="monkey-image" src="assets/monkey_pics/${escapeHtml(type)}.jpg" alt="Monkey Image">
            <h3 class="monkey-name">${escapeHtml(name)}</h3>
            <div class="monkey-meta">${escapeHtml(type)} — ${escapeHtml(continent)}</div>
            <p class="monkey-info" style="display: flex; justify-content: space-between; align-items: flex-start; word-break: break-word;">
                ${escapeHtml(info)}
                <i class="fa-solid fa-pen-to-square"></i>
            </p>
            <div class="monkey-owner" style="display: flex; justify-content: space-between; align-items: flex-end;">
                Created by: ${escapeHtml(username)}
                <i class="fa-solid fa-trash-can"></i>
            </div>
        `;

    return card; 
}

async function loadMonkeys() {
    const monkeyList = document.getElementById('monkey-list');
    const status = document.getElementById('success');
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
            status.innerHTML = 'No user id found in localStorage';
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/Monkey/user/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            console.error('Request failed:', response.status);
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

// Start
loadMonkeys();