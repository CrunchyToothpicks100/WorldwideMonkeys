// character count for Info textarea
const infoTextarea = document.getElementById("info");
const remainingSpan = document.getElementById("info-remaining");
const MAX_INFO = 150;

// update remaining character count
function updateRemaining() {
    if (!infoTextarea || !remainingSpan) return;
    const len = infoTextarea.value.length;
    const remain = Math.max(0, MAX_INFO - len);
    remainingSpan.textContent = remain;
    remainingSpan.style.color = remain <= 10 ? "#ff6b6b" : ""; // optional visual cue
}

// prevernt typing beyond max limit
if (infoTextarea && remainingSpan) {
    updateRemaining();
    infoTextarea.addEventListener("input", () => {
        if (infoTextarea.value.length > MAX_INFO) {
            infoTextarea.value = infoTextarea.value.slice(0, MAX_INFO);
        }
        updateRemaining();
    });
}