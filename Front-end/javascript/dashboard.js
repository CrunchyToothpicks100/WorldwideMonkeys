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

    // IMPORTANT: Normalize possible casing from API (Name vs name)
    const name = monkey.Name;
    const type = monkey.Type;
    const continent = monkey.Continent;
    const info = monkey.Info;
    const username = monkey.Username;

    card.innerHTML = `
        <div class="monkey-card-inner">
            <img class="monkey-image" src="assets/monkey_pics/${escapeHtml(type)}.jpg" alt="Monkey Image">
            <h3 class="monkey-name">${escapeHtml(name)}</h3>
            <div class="monkey-meta">${escapeHtml(type)} — ${escapeHtml(continent)}</div>
            <p class="monkey-info">${escapeHtml(info)}</p>
            <div class="monkey-owner">Created by: ${escapeHtml(username)}</div>
        </div>`;

    return card;
}

async function loadMonkeys() {
    const monkeyList = document.getElementById('monkey-list');
    const status = document.getElementById('success');
    if (!monkeyList) return;

    // Dummy sample cards for testing layout
    if (BYPASS_MONKEY_FETCH) {
        const sample = { 
            Name: 'Jimmy (Sample)', 
            Type: 'Woolly', 
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

        const response = await fetch(`http://10.102.83.86:7264/api/Monkey/user/${userId}`, {
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