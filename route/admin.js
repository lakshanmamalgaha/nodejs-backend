const express = require("express");
const router = express.Router();
const database = require("../database/database");
const nodemailer=require('nodemailer');
var generator = require('generate-password');
const bcrypt = require('bcryptjs');
const saltRounds = 10;



let transporter=nodemailer.createTransport({
    service:'gmail',
    secure:false,
    port:25,
    auth:{
        user:'nodeapp123456@gmail.com',
        pass:'nodemailer'
    },
    tls:{
        rejectUnauthorized:false
    }
});


router.post("/addEmployee", (req, res) => {
    var emp_password = generator.generate({
        length: 10,
        numbers: true
    });
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(emp_password, salt);
    console.log(emp_password);
    var appData = {};
    var role=req.body.role;
    var type='';
    if(role==='1'){
        type=2
    
    }else{
        type=1
    }
    var data = {
        comId:req.body.comID,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        speciality: req.body.speciality,
        role:req.body.role,
        type:type
    }
    
    database.query("INSERT INTO employee SET ?", data, (err, rows, fields) => {
        if (err) {
            appData.error = 1;
            appData["data"] = err;
            res.status(200).json(appData);
            
        } else {
            appData.error = 0;
            appData["data"] = rows;
            res.status(400).json(appData);
            let HelperOptions = {
                from: '"Sample"<nodeapp123456@gmail.com>',
                to: data.email,
                subject: 'This is your password',
                text: 'use this password for login :  ' + emp_password

            };
            transporter.sendMail(HelperOptions, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                console.log(info);
            });
        }
    });

    
});

router.get("/role", (req, res) => {
    var appData = {};

    database.query(
        "SELECT * FROM role",
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




router.post("/addrole", (req, res) => {
    var appData = {};
    var data = {
        comID:req.body.comID,
        role_name: req.body.role_name,
        description: req.body.description,
        basic_salary: req.body.basic_salary,
        leaves:req.body.leaves,
        ot_rate:req.body.ot_rate
    };
    console.log(data);
    database.query("INSERT INTO role SET ?", data, (err, rows, fields) => {
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

router.get("/employee", (req, res) => {
    var appData = {};

    database.query(
        "SELECT * from employee",
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

router.get("/accept", (req, res) => {
    var appData = {};
    var accepted=1;
    var ID=req.body.ID;
    console.log(req)
    database.query(
        `UPDATE leavehistory SET isaccepted='${accepted}' WHERE ID='${ID}'`,
        (err, rows, fields) => {
            if (err) {
                // appData.error = 1;
                appData["data"] = err;
                res.status(400).json(appData);
                console.log(res)
            } else {
                //appData.error = 0;
                //appData["data"] = rows;
                res.status(200).json(rows);
                console.log(res)
            }
        }
    );
});

module.exports=router;
