/**
 * Created by Administrator on 2017/6/28.
 */
var file = require("../models/file.js");

//主页
exports.showIndex = function (req, res, next) {
    file.getAllAlbums(function (err, allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render("index", {"album": allAlbums});
    });
}

//相册页
exports.showAlbum = function (req, res, next) {
    //遍历相册中的所有图片
    var albumName = req.params.albumName;
    file.getAllAlbumsImg(albumName, function (err, allImages) {
        if (err) {
            next();
            return;
        }

        res.render("album", {
            "albumName": albumName,
            "allImages": allImages
        })
    })
}

//上传页
exports.showUp = function (req, res) {
    file.getAllAlbums(function (err, albums) {
        res.render("up", {
            "albums": albums
        })
    });
}

//获取上传数据
exports.doPost = function (req, res) {
    var albumName = req.body.ablum;
    var imgData = req.files.imgSrc;
    file.uploadImgSave(albumName, imgData, function (err) {
        if (err) {
            res.writeHead(200, {"Content-type":"text/html"});
            res.end("<script>alert(文件不能大于2m)</script>");
            return;
        }
        res.end('ok')
    });
}