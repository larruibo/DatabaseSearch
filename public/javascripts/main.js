const dataBase = document.querySelector("#dataBase-select");
const collection = document.querySelector("#collection-select");

const updateCols = colecciones => {
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

const createRegister = registro => {
    const create = document.querySelector("#createForm");
    create.innerHTML = "";
    const divTitle = document.createElement("h2");
    divTitle.innerHTML = "Create";
    create.appendChild(divTitle);
    for (let item in registro) {
        if (item !== "_id") {
            const div = document.createElement("div");
            div.classList.add("form-group");
            const label = document.createElement("label");
            label.setAttribute("for", item);
            label.innerHTML = item;

            const input = document.createElement("input");
            input.setAttribute("name", item);
            input.classList.add("form-control");

            div.appendChild(label);
            div.appendChild(input);
            create.appendChild(div);
        }
    }

    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("type", "submit");
    button.innerHTML = "Create";

    create.appendChild(button);
};

const updateInfo = coleccion => {
    let contador = 1;
    const info = document.querySelector("#info");
    info.innerHTML = "";

    coleccion.forEach(registro => {
        if (contador === 1) {
            let reg = registro;
            createRegister(registro);
        }
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        div2.classList.add("col-2");
        const number = document.createElement("h5");
        number.textContent = contador;
        div2.appendChild(number);
        info.appendChild(div2);

        const div3 = document.createElement("div");
        div3.classList.add("col-10");
        for (let item in registro) {
            const texto = document.createElement("p");
            texto.textContent = `${item}: ${registro[item]}`;
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
