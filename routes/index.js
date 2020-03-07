var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");
ObjectId = require("mongodb").ObjectID;

/* GET home page. */
router.get("/", function(req, res, next) {
    mu.algo.listDataBases().then(dataBases => {
        _dbName = dataBases[0].name;
        console.log("We did it, showing databases");
        mu.algo.listCollections(_dbName).then(collections => {
            console.log("We did it, showing collections");
            res.render("index", {
                title: "Mongo Explorer",
                dataBases: dataBases,
                collections: collections
            });
        });
    });
});

//Endpoint to get collections
router.get("/:query", (req, res) => {
    const nombre = req.params.query;
    console.log(nombre);
    const name = new RegExp(`.*${req.params.query}.*`, "i");
    console.log(name);
    const query = { name: name };
    console.log(query);
    mu.algo.listCollections(nombre).then(collections => res.json(collections));
});

//Endpoint to get data from collection
router.get("/:db/:col", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;
    console.log(_dbName);
    console.log(_colName);
    mu.algo.find(_dbName, _colName).then(collections => res.json(collections));
});

//Endpoint to create a new register
router.post("/:db/:col/create", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;

    let data = req.body;
    const registro = {};
    for (let item in data) {
        console.log(item, data[item]);
        registro[item] = data[item];
    }
    console.log(registro);
    mu.algo.insert(_dbName, _colName, registro).then(res.redirect("/"));
});

//Endpoint to delete a register
router.post("/:db/:col/:id", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;
    const _id = req.params.id;

    const query = { _id: new ObjectId(_id) };

    console.log(query);
    mu.algo.remove(_dbName, _colName, query).then(res.redirect("/"));
});

module.exports = router;
