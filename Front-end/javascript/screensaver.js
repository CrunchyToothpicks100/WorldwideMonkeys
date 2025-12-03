const mandrill = document.getElementById("mandrill");
const container = document.getElementById("container");

let x = 15;
let y = 15;
let dx = Math.random() < 0.5 ? 2 : -2; // speed X
let dy = Math.random() < 0.5 ? 2 : -2; // speed Y

function randomColor() {
    return `hue-rotate(${Math.random() * 360}deg)`;
}

function animate() {
    const containerRect = container.getBoundingClientRect();
    const mandrillRect = mandrill.getBoundingClientRect();

    x += dx;
    y += dy;

    // Right / Left collision
    if (x + mandrillRect.width >= containerRect.width || x <= 0) {
        dx *= -1;
        mandrill.style.filter = randomColor();
    }

    // Bottom / Top collision
    if (y + mandrillRect.height >= containerRect.height || y <= 0) {
        dy *= -1;
        mandrill.style.filter = randomColor();
    }

    mandrill.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(animate);
}

animate();