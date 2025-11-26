function findHome() {
    const loggedIn = localStorage.getItem('user_id') !== null;
    window.location.href = loggedIn ? 'index_logged_in.html' : 'index.html';
}