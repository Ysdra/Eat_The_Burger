const express = require("express");
const router = express.Router();

const burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.select(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log(req.body);
    burger.create(
        [ "burger_name", "devoured" ] 
        , [ req.body.burger_name, req.body.devoured] 
        , function (result) {
            // return the IDs of a new quote
            res.json({ id: result.insertId });
        }
    );
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.update(
        { devoured: req.body.devoured } 
        , condition
        , function (result) {
            if (!result.changedRows) {
                return res.status(404).end();
            }
            
            res.status(200).end();
        }
    );
});

router.delete("/api/burgers/:id", (req, res) => {
    var condition = `id = ${req.params.id}`;
    console.log("condition", condition);

    burger.delete(condition, result => {
        if (!result.affectedRows) {
            return res.status(404).end();
        }

        res.status(200).end();
    });
})

// export routes for server.js
module.exports = router;
