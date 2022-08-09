const express =  require("express");
const app = express();
const port = process.env.Port | 6789;

app.listen(port,function () {
    console.log("sever is running....");
});
app.set("view engine","ejs");
app.use(express.static("public"));

const mysql = require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"....",
    multipleStatements: true

});
app.get("/",function (req, res) {
    res.render("home");
});
app.get("/baohanh",function (req,res){
    res.render("baohanh")
})


