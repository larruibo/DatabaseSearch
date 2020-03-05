var express = require("express");
var router = express.Router();
const mu = require("../db/MongoUtils.js");

/* GET home page. */
router.get("/", function(req, res, next) {
    mu.algo.listDataBases().then(dataBases => {
        console.log("We did it");
        res.render("index", { title: "Mongo Explorer", dataBases: dataBases });
    });
});

module.exports = router;
