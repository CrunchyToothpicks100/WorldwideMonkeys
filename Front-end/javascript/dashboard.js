// Toggle to insert a dummy card for layout/testing. Set to false for real fetch rendering.
const BYPASS_CREATE = true;

function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function createMonkeyCard(m) {
    const card = document.createElement('div');
    card.className = 'monkey-card';

    // Normalize possible casing from API (Name vs name)
    const name = m.Name ?? m.name ?? 'Unnamed';
    const type = m.Type ?? m.type ?? '';
    const continent = m.Continent ?? m.continent ?? '';
    const info = m.Info ?? m.info ?? '';
    const username = m.Username ?? m.username ?? '';

    card.innerHTML = `
        <div class="monkey-card-inner">
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

    // Optional test card
    if (BYPASS_CREATE) {
        const sample = { Name: 'Sample Monkey', Type: 'Test', Continent: 'Nowhere', Info: 'Demo card', Username: 'tester' };
        monkeyList.appendChild(createMonkeyCard(sample));
        return;
    }

    try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            status.innerHTML = 'No user id found in localStorage';
            return;
        }

        const response = await fetch(`http://10.102.83.86:7264/api/user/${user_id}`, {
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