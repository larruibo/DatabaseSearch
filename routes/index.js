var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res, next) {
    mu.algo.listDataBases();
    mu.algo.listCollections();
    mu.algo.find().then(algo => {
        console.log("We did it");
    });
    res.render("index", { AlgunaCosa: "Alguna Cosa" });
});

module.exports = router;
