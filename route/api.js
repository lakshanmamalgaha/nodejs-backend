const express = require("express");
const router = express.Router();
const database = require("../database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post("/login", (req, res) => {
    var appData;
    var email = req.body.email;
    var password = req.body.password;
    
   // console.log(input);

   database.query("SELECT * FROM employee WHERE email= ?", email, function (
        err,
        rows,
        fields
    ) {
        if (err) {
           // appData.error = 1;
           // appData["data"] = "Error Occured!";
           // res.json(appData);
        } else {
            if ((rows.length = 1)) {
                if (rows[0]) {
                   // console.log(rows);
                   //var salt = bcrypt.genSaltSync(saltRounds);
                  // var hash = bcrypt.hashSync(password, salt);
                   var bool = bcrypt.compareSync(password,rows[0].password);
                    console.log(bool)
                    if (bool) {
                        var data = JSON.stringify(rows[0]);
                        let token = jwt.sign({
                                payload: {
                                    ID:rows[0].empID,
                                    comId:rows[0].comId,
                                    name: rows[0].name,
                                    email: rows[0].email,
                                    role:rows[0].role,
                                   speciality:rows[0].speciality,
                                   type:rows[0].type,
                                   mobile:rows[0].mobile,
                                   gender: rows[0].gender,
                                   address:rows[0].address,
                                   dob:rows[0].dob

                                }
                            },
                            "sample", {
                                expiresIn: 1440
                            }
                        );
                       // appData.error = 0;
                        appData = token;
                       res.status(200).json(appData);
                    } else {
                       // appData.error = 1;
                       // appData["data"] = "Email and Password does not match";
                       // res.json(appData);
                    }
                } else {
                    //appData.error = 1;
                   // appData["data"] = "Email and Password does not match";
                   // res.json(appData);
                }
            } else {
                //appData.error = 1;
                //appData["data"] = "Email does not exists!";
               // res.status(204).json(appData);
            }
        }
    });
    
});

router.post("/register", (req, res) => {
    var data_com = {
        companyname:req.body.name};
    

    database.query("INSERT INTO company SET ?",data_com , (err, rows, fields) => {
        if (!err){
            
            database.query("SELECT companyID as comId from company ORDER BY companyID DESC LIMIT 1",
            function (err, ID, fields) {
                console.log(ID[0])
            var password=req.body.password;
            var hash = bcrypt.hashSync(password, saltRounds);
            var data = {
                comId:ID[0].comId,
                name: req.body.name + ' Admin',
                email: req.body.email,
                password:hash,
                type:0
            };
            database.query("INSERT INTO employee SET ?", data, (err, rows, fields) => {
                
            });
        });
    }
});
});

router.post("/change_password", (req, res) => {
    var appData = {};
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, saltRounds);
    var data = {
        empID: req.body.empID,
        password:hash
    };
    console.log(data);
    database.query(`UPDATE employee SET password='${data.password}' WHERE empID='${data.empID}'`, (err, rows, fields) => {
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