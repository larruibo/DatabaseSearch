const dataBase = document.querySelector("#dataBase-select");
updateCols = colecciones => {
    const collections = document.querySelector("#collection-select");
    collections.innerHTML = "";

    colecciones.forEach(coleccion => {
        const option = document.createElement("option");
        option.value = coleccion.name;
        option.textContent = coleccion.name;

        collections.appendChild(option);
    });
};

const onChange = evt => {
    const query = document.querySelector("#dataBase-select").value;
    fetch(`/databases/${query}`)
        .then(res => res.json())
        .then(updateCols);
    evt.preventDefault();
};

dataBase.addEventListener("change", onChange);
