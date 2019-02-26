var express = require('express');
var app = express();
//var cors=require('cors');
var bodyParser = require('body-parser');
const database=require("./database/database");
const admin=require("./route/admin");
const projectLeader = require("./route/projectLeader");
const projectManager = require("./route/projectmanager");
const employee=require('./route/employee')
const api = require("./route/api");



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


 app.use((req,res,next)=>{
     res.header('Access-Control-Allow-Origin','*');
     res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-Width,Content-Type, Accept, Authorization');
     if(req.method=="OPTIONS"){
       res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
       return res.status(200).json({});
     }
     next();

 });


app.use("/admin",admin);
app.use("/projectleader",projectLeader);
app.use("/api",api);
app.use("/projectmanager",projectManager);
app.use('/employee',employee);



/*
app.get("/", (req, res, next) => {
    con.query("select * from project", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });

});

app.post("/login", (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    con.query("select * from sample where email=?", email, function (err, result, fields) {
        console.log(result.length);
        if (result.length != 0) {
            if (password == result[0].password) {
                res.status(200).send(JSON.stringify(result[0]));

            }
        } else {
            res.send(400).send("wrong password");
        }
        res.json("successful");

    });
});




app.post("/", (req, res, next) => {
    var post_data = req.body;
    con.query("INSERT INTO project SET?", post_data, function (err, result, fields) {
        if (err) throw err;
        res.json("successful");

    });
});

app.post("/addEmployee", (req,res,next) => {
    var post_data = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
        speciality : req.body.speciality
    }
    con.query("INSERT INTO employee SET ?", post_data, function (err, result, fields) {
        
        console.log("1 record inserted");

    });
});
*/
database.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + database.threadId);
});


app.listen(8080, () => {
    console.log('port 8080')
});