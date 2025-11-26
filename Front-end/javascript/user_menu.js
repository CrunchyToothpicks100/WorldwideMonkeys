const userMenuButton = document.getElementById('user-menu-button');
userMenuButton.textContent = `Welcome, ${localStorage.getItem("username")}!`;

function openMenu(evt) {
    evt.stopPropagation();

    // remove any previous menu to avoid duplicates
    const prev = document.getElementById('user-menu');
    if (prev) prev.remove();

    const sticky = document.querySelector('.sticky-menu');
    const rect = sticky.getBoundingClientRect();

    const menu = document.createElement('div');
    menu.id = 'user-menu';
    menu.style.position = 'fixed'; // position relative to viewport
    menu.style.border = '1px solid #d1da49';
    menu.style.top = `${rect.bottom}px`;
    menu.style.right = '40px';
    menu.style.padding = '10px';
    menu.innerHTML = `<button class="subtle_button" style="color: #d1da49; padding-inline: 15px;" onclick="window.location.href='settings.html'">Settings</button><br>
                      <button class="subtle_button" style="color: #d1da49; padding-inline: 15px;" onclick="logout()">Log Out</button>`;
    document.body.appendChild(menu);

    // click away to close menu
    document.addEventListener('click', function handler(event) {
        if (!menu.contains(event.target)) {
            menu.remove();
            document.removeEventListener('click', handler);
        }
    });
}

function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 200);
}