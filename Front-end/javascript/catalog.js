import { API_BASE_URL } from './IPConfig.js';
import { setupTooltips } from './tooltip.js';

document.getElementById('reload-button').addEventListener('click', async () => {
    await loadMonkeyTable();
});

function createMonkeyRowHeader() {
    const header = document.createElement('tr');
    header.innerHTML = `
        <th class="name-col">Name</th>
        <th class="continent-col">Continent</th>
        <th class="type-col">Type</th>
        <th class="info-col">Info</th>
        <th class="creator-col">Creator</th>
    `;

    return header;
}

function createMonkeyRow(monkey) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="name-col">${monkey.name}</td>
        <td class="continent-col">${monkey.continent}</td>
        <td class="type-col">${monkey.type}</td>
        <td class="info-col">${monkey.info}</td>
        <td class="creator-col">${monkey.username}</td>
    `;

    return row;
}

async function loadMonkeyTable() {
    const monkeyTable = document.getElementById('monkey-table');
    const status = document.getElementById('success');
    if (!monkeyTable) return;

    try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            status.innerHTML = 'Login Required';
            return;
        }

        const response = await fetch(`${API_BASE_URL}/api/Monkey/all`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            status.innerHTML = `Error: ${response.status}`;
            return;
        }

        const responseData = await response.json();

        // Clear any previous content
        monkeyTable.innerHTML = '';

        const header = createMonkeyRowHeader();
        monkeyTable.appendChild(header);

        responseData.forEach(m => {
            const row = createMonkeyRow(m);
            monkeyTable.appendChild(row);
        });

    } catch (err) {
        console.error('Error connecting to server:', err);
        if (status) status.innerHTML = 'Error connecting to server';
    }

    await setupTooltips();
}

// Start
loadMonkeyTable();