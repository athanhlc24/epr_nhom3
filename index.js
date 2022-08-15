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
    database:"e-project",
    multipleStatements: true

});
var brandList =[];
const sql_txt = "select * from brands";

conn.query(sql_txt,function (err,data){
    if(err) res.send("Not Found 404");
    else{
        brandList = data;
    }
});
app.get("/",function (req, res) {
    res.render("home");
});
app.get("/baohanh",function (req,res){
    const BrName = req.query.BrName;
    res.render("baohanh",{
        "brandList":brandList,

    });

});
app.get("/warranty",function (req,res){
    const BrName = req.query.BrName;
    const sql_txt = "select * from brands where BrName like '"+BrName+"'";

    conn.query(sql_txt,function (err,data){
        if(err) res.send("Not Found 404");
        // res.send(data);
        else{
            var brandWarrantyList = data;

            res.render("warranty",{
            "brandWarrantyList":brandWarrantyList,
                "brandList":brandList,
            });
        }
    });

});
app.get("/phutung",function (req,res){
    const BrName = req.query.BrName;
    const sql_txt = "select * from brands where BrName like '"+BrName+"'";

    conn.query(sql_txt,function (err,data){
        if(err) res.send("Not Found 404");
        // res.send(data);
        else{
            var brandWarrantyList = data;

            res.render("phutung",{
                "brandWarrantyList":brandWarrantyList,
                "brandList":brandList,
            });
        }
    });

});
app.get("/list-product",function (req, res) {
    const sql_list ="select Name,Price from cars";
    conn.query(sql_list,function (err,data) {
        if (err) res.send("404 NOT FOUND");
        else{
            var listProduct = data;
            res.render("list-product",{
                "listProduct": listProduct
            })
        }
        
    })
});


