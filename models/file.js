/**
 * Created by Administrator on 2017/6/28.
 */
//fs 以根目录开始
var fs = require("fs");
var sd = require('silly-datetime');
//获取相册文件夹
exports.getAllAlbums = function (callback) {
    fs.readdir("./uploads", function (err, files) {
        if (err) {
            //console.log(err);
            callback(err, null);
            return;

        }
        var allAlbums = [];
        (function iterator(i) {
            if (i == files.length) {
                callback(null, allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i], function (err, stats) {
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0)
    });
}
//获取相册文件夹下图片
exports.getAllAlbumsImg = function (albumName, callback) {
    fs.readdir("./uploads/" + albumName, function (err, files) {
        if (err) {
            //console.log(err);
            callback(err, null);
            return;
        }
        var allImages = [];

        (function iterator(i) {

            if (i == files.length) {
                callback(null, allImages);
                return;
            }

            fs.stat("./uploads/" + albumName + "/" + files[i], function (err, stats) {
                if (stats.isFile()) {
                    allImages.push("/" + albumName + "/" + files[i]);
                }
                iterator(i + 1);
            });

        })(0)
    });
}

//上传图片地址存储和命名设置
exports.uploadImgSave = function(ablumName,imgData,callback){
    if(imgData&&ablumName){
        var size = imgData.size;
        var nowtime = sd.format(new Date(), 'YYYYMMDDHHmm');//时间戳
        var random = parseInt(Math.random()*89999)+10000;
        var oldSrc = './uploads/'+imgData.name;
        var nowSrc = './uploads/'+ablumName+'/'+nowtime+random+'.'+imgData.extension;

        if(size>2000000){
            fs.unlink(oldSrc,function(){
                callback("文件不能大于2m");
            });
        }else{
            fs.rename(oldSrc,nowSrc,function(err){
                callback(err);
            });
        }
    }
}

exports.newFile = function(fileName,callback){
    var files = './uploads/'+fileName;
    console.log(files)
    fs.mkdir(files,function(err){
        if(err){
            callback(err);
            return;
        }
        callback(null);
    })
}