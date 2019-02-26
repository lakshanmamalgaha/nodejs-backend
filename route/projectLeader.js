const express = require("express");
const router = express.Router();
const database = require("../database/database");

router.post("/addTransaction", (req, res) => {
    var appData = {};
    var data = {
        projectID:req.body.projectID,
        type: req.body.type,
        amount: req.body.amount,
        description: req.body.description,
        comId:req.body.comId
    };

    database.query("INSERT INTO projectfinance SET ?", data, (err, rows, fields) => {
        if (err) {
            appData.error = 1;
            appData["data"] = err;
            res.status(200).json(appData);
        } else {
            appData.error = 0;
            appData["data"] = rows;
            res.status(400).json(appData);
        }
    });
});
router.post("/edit_profile", (req, res) => {
    var appData = {};
    var data = {
        empID: req.body.ID,
        mobile: req.body.mobile,
        address: req.body.address,
        gender: req.body.gender,
        dob: req.body.dob
    };

    database.query(`UPDATE employee SET mobile='${data.mobile}',gender='${data.gender}',address='${data.address}',dob='${data.dob}' WHERE empID='${data.empID}'`, (err, rows, fields) => {
        if (err) {
            appData.error = 1;
            appData["data"] = err;
            res.status(200).json(appData);
        } else {
            appData.error = 0;
            appData["data"] = rows;
            res.status(400).json(appData);
        }
    });
});
router.get("/myproject", (req, res) => {
    var appData = {};

    database.query(
        "SELECT * FROM project_employee",
        (err, rows, fields) => {
            if (err) {
                // appData.error = 1;
                appData["data"] = err;
                res.status(400).json(appData);
            } else {
                //appData.error = 0;
                //appData["data"] = rows;
                res.status(200).json(rows);
            }
        }
    );
});
module.exports = router;