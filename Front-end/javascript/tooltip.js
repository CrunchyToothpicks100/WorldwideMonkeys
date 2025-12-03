
export async function setupTooltips() {
    setTimeout(() => {
        const tooltip = document.getElementById("tooltip");

        const infoCols = document.querySelectorAll(".info-col, .name-col");

        console.log("Attaching tooltip listeners to", infoCols.length, "info cells.");

        console.log("Setting up tooltips for info columns.");
        infoCols.forEach(cell => {
            const isClipped = cell.scrollWidth > cell.clientWidth;
            if (!isClipped) return; // No tooltip needed

            cell.addEventListener("mouseenter", e => {
                tooltip.textContent = cell.textContent;
                tooltip.style.display = "block";
            });

            cell.addEventListener("mousemove", e => {
                tooltip.style.left = e.clientX + 15 + "px"; // offset from cursor
                tooltip.style.top = e.clientY + 15 + "px";
            });

            cell.addEventListener("mouseleave", () => {
                tooltip.style.display = "none";
            });
        });
    }, 1000); // slight delay to ensure DOM is ready   
}