/**
 * Created by Administrator on 2017/6/28.
 */
var express = require("express");
var app = express();
var router = require("./controller")
var bodyParser = require('body-parser');
var multer = require('multer');



//设置模版引擎
app.set("view engine","ejs");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer({ dest: 'uploads/' })); // for parsing multipart/form-data

//路由中间件，静态资源服务
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//首页
app.get("/",router.showIndex);
//上传页
app.get("/up",router.showUp);
//获取上传数据
app.post("/up",router.doPost);
//相册页
app.get("/:albumName",router.showAlbum);
//404页
app.use(function(req,res){
    res.render('404');
})
app.listen(80);
