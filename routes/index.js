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
    mu.algo.listCollections(nombre).then(collections => res.json(collections));
});

//Endpoint to get data from collection
router.get("/:db/:col", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;
    mu.algo.find(_dbName, _colName).then(collections => res.json(collections));
});

//Endpoint to create a new register
router.post("/:db/:col/create", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;

    let data = req.body;
    const registro = {};
    for (let item in data) {
        registro[item] = data[item];
    }
    mu.algo.insert(_dbName, _colName, registro).then(res.redirect("/"));
});

//Endpoint to delete a register
//Intenté hacerlo de muchas maneras, pero HTML solo permite hacer GET y POST en los formularios.
//Leí en internet que con un middleware de method_override se puede hacer que un post se convierta
//en Delete con un ?=_method=DELETE pero no pude implementarlo.
router.post("/:db/:col/:id", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;
    const _id = req.params.id;

    const query = { _id: new ObjectId(_id) };

    mu.algo.remove(_dbName, _colName, query).then(res.redirect("/"));
});

//Endpoint findOne
router.get("/:db/:col/:id", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;
    const _id = req.params.id;

    const query = { _id: new ObjectId(_id) };

    mu.algo.findOne(_dbName, _colName, query).then(record => res.json(record));
});

//Endpoint updateOne
router.post("/:db/:col/:id/update", (req, res) => {
    const _dbName = req.params.db;
    const _colName = req.params.col;
    const _id = req.params.id;
    const data = req.body;
    const registro = {};
    for (let item in data) {
        registro[item] = data[item];
    }

    const final = { $set: registro };

    const query = { _id: new ObjectId(_id) };

    mu.algo.updateOne(_dbName, _colName, query, final).then(res.redirect("/"));
});

module.exports = router;
