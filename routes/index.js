var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");

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
router.get("/databases/:query", (req, res) => {
    const nombre = req.params.query;
    console.log(nombre);
    const name = new RegExp(`.*${req.params.query}.*`, "i");
    console.log(name);
    const query = { name: name };
    console.log(query);
    mu.algo.listCollections(nombre).then(collections => res.json(collections));
});

module.exports = router;
