const express = require("express");
const router = express.Router();
const database = require("../database/database");

router.post("/edit_profile", (req, res) => {
    var appData = {};
    var data = {
        empID: req.body.ID,
        mobile: req.body.mobile,
        address: req.body.address,
        gender: req.body.gender,
        dob: req.body.dob
    };

    database.query(`UPDATE employee SET mobile='${data.mobile}',gender='${data.gender}',address='${data.address}',dob='${data.dob}' WHERE empID='${data.empID}'`,(err, rows, fields) => {
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

router.post("/apply_leave", (req, res) => {
    var appData = {};
    var data = {
        empID: req.body.ID,
        comId:req.body.comId,
        reason: req.body.reason,
        typeOne: req.body.selectedOption,
        typeTwo: req.body.selected
    };
    console.log(req)
    console.log(data)
    database.query('INSERT INTO leavehistory SET ?',data, (err, rows, fields) => {
        if (err) {
            appData.error = 1;
            appData["data"] = err;
            res.status(200).json(appData);
            console.log(err)
        } else {
            appData.error = 0;
            appData["data"] = rows;
            res.status(400).json(appData);
            
        }
    });
});
router.get("/leaves", (req, res) => {
    var appData = {};

    database.query(
        "SELECT * FROM leavehistory",
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
router.get("/project", (req, res) => {
    var appData = {};

    database.query(
        "SELECT * FROM project",
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