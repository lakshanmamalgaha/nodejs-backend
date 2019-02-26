const express = require("express");
const router = express.Router();
const database = require("../database/database");

router.post("/add_project", (req, res) => {
    var appData = {};
    var data = {
        project_name: req.body.project_name,
        description: req.body.description,
        budget: req.body.budget,
        type: req.body.project_type,
        comID:req.body.ID
    };

    database.query("INSERT INTO project SET ?", data, (err, rows, fields) => {
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

router.get("/project", (req, res) => {
    var appData = {};
    var comId=req.body.comId;

    database.query(
        "SELECT * FROM project",
        function(err, rows, fields) {
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
router.post("/assign_members", (req, res) => {
    var appData = {};
    var role=req.body.role;
    var empID=req.body.empID;
    var type=2;
    console.log(role)
    if(role==='0'){
         database.query(`UPDATE employee SET type='${type}' WHERE empID='${empID}'`, (err, rows, fields) => {
             
         });
    }
    else{
        console.log('err')
    }
    var data = {
        comId: req.body.comId,
        projectID: req.body.projectID,
        role: req.body.role,
        empID:req.body.empID
    };
    
    
    database.query("INSERT INTO project_employee SET ?", data, (err, rows, fields) => {
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



module.exports = router;