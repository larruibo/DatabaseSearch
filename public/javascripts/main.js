const dataBase = document.querySelector("#dataBase-select");
const collection = document.querySelector("#collection-select");

updateCols = colecciones => {
    const collections = document.querySelector("#collection-select");
    collections.innerHTML = "";

    const option = document.createElement("option");
    option.textContent = "--";
    collections.appendChild(option);

    colecciones.forEach(coleccion => {
        const optionC = document.createElement("option");
        optionC.value = coleccion.name;
        optionC.textContent = coleccion.name;
        collections.appendChild(optionC);
    });
};

updateInfo = coleccion => {
    let contador = 1;
    const info = document.querySelector("#info");
    info.innerHTML = "";

    coleccion.forEach(registro => {
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        div2.classList.add("col-3");
        const number = document.createElement("h5");
        number.textContent = contador;
        div2.appendChild(number);
        info.appendChild(div2);

        const div3 = document.createElement("div");
        div3.classList.add("col-9");
        for (let item in registro) {
            const texto = document.createElement("p");
            texto.textContent = `${item}: ${registro.item}`;
            div3.appendChild(texto);
        }
        info.appendChild(div3);
        contador += 1;
    });
};

const onChange = evt => {
    const query = document.querySelector("#dataBase-select").value;
    fetch(`/${query}`)
        .then(res => res.json())
        .then(updateCols);
    evt.preventDefault();
};

const onChangeCol = evt => {
    const _dbName = document.querySelector("#dataBase-select").value;
    const _colName = document.querySelector("#collection-select").value;
    fetch(`/${_dbName}/${_colName}`)
        .then(res => res.json())
        .then(updateInfo);
    evt.preventDefault();
};

dataBase.addEventListener("change", onChange);
collection.addEventListener("change", onChangeCol);
