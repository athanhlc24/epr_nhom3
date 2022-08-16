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

app.get("/creation",function (req, res) {
    res.render("creation",{
        "brandList": brandList,
    });
});
app.get("/develop",function (req, res) {
    res.render("develop",{
        "brandList": brandList,
    });
});
app.get("/aboutus",function (req, res) {
    res.render("aboutus",{
        "brandList": brandList,
    });
});
app.get("/design",function (req, res) {
    res.render("design",{
        "brandList": brandList,
    });
});
app.get("/baohanh",function (req,res) {
    const BrName = req.query.BrName;
    res.render("baohanh", {
        "brandList": brandList,
    });
});
app.get("/",function (req, res) {
        const sql_txt ="select Name,Year,Price,HotCars,Fueltype from cars inner join fueltypes on cars.FtID = fueltypes.FtID" ;

        conn.query(sql_txt,function (err,data){
            if(err) res.send("Not Found 404");
            // res.send(data);
            else{
                var bestList = data;


                res.render("home",{
                    "brandList":brandList,
                    "bestList":bestList,
                });
            }
        })

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
    const BrName = req.query.BrName;
    const sql_list ="select * from cars where BrID in(select BrID from brands where BrName like '"+BrName+"');"+
        "select BodyStyle from bodystyles inner join cars on bodystyles.BdID = cars.BdID where BrID in(select BrID from brands where BrName like '"+BrName+"');"+
        "select Fueltype from fueltypes inner join  cars on fueltypes.FtID = cars.FtID where BrID in(select BrID from brands where BrName like '"+BrName+"')";
    conn.query(sql_list,function (err,data) {
        if (err) res.send("404 NOT FOUND");
        // res.send(data)
        else{
            var listProduct = data[0];
            var bodyList = data[1];
            var fuelList = data[2];
            res.render("list-product",{
                "brandList":brandList,
                "listProduct": listProduct,
                "bodyList":bodyList,
                "fuelList":fuelList,
            })
        }

    });
});
app.get("/car-price-list",function (req, res) {
    const sql_list ="select Name,Price from cars";
    conn.query(sql_list,function (err,data) {
        if (err) res.send("404 NOT FOUND");
        else{
            var carPriceList = data;
            res.render("car-price-list",{
                "carPriceList": carPriceList
            })
        }

    })
});
app.get("/search",function(req,res) {
    const search = req.query.search
    const sql_search = "select * from cars inner join brands on cars.BrID=brands.BrID inner join bodystyles on cars.BdID=bodystyles.BdID inner join fueltypes  on cars.FtID=fueltypes.FtID where Name like '%"+search+"%' or BodyStyle like '%"+search+"%' or Fueltype like '%"+search+"%' or BrName like '%"+search+"%' or Year like '"+search+"' ";
    // res.send(sql_search)
    conn.query(sql_search, function (err, data) {
        if (err) res.send("404 Not Found");
        else {
            var searchList = data;
            res.render("search", {
                "searchList": searchList,
                "brandList":brandList,
            })
        }
    })
});


