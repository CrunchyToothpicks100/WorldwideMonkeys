const continentSelect = document.getElementById("continent");
const typeSelect = document.getElementById("type");

// Which species are native to each continent
const typeOptions = {
    africa: ["Baboon", "Chimpanzee", "Mandrill", "Vervet"],
    asia: ["Orangutan", "Macaque", "Gibbon", "Leaf Monkey"],
    south_america: ["Capuchin", "Howler", "Spider", "Woolly"]
};

// When user changes continent
continentSelect.addEventListener("change", () => {
    const selectedContinent = continentSelect.value;

    // Clear out previous options
    typeSelect.innerHTML = '<option value="">--Select a type--</option>';

    // If a continent is selected, add corresponding types
    typeOptions[selectedContinent].forEach(type => {
        const option = document.createElement("option");
        option.value = type.toLowerCase();
        option.textContent = type;
        typeSelect.appendChild(option);
    });
});