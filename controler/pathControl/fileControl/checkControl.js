/**
 * Created by dragon.kuang on 2016/3/17.
 */

"use strict";
var path = require("path");
var fs = require('fs');
var imageInfo = require('imageinfo');
var MaxSize = 10;
var checkTips = [
    "文件已存在", //0
    "文件格式错误", //1
    "文件格式与真实文件格式不相符", //2
    "文件超过最大上传格式", //3
    "文件不存在", //4
]
var checkFile = {

    checkFileInfo : function(fName,fPath) {
        var folderPath = path.join(fPath,fName);
        var pathType = path.extname(fName).slice(1).toLowerCase();
        var data = fs.readFileSync(folderPath);
        if(!data){
            return 1 //文件格式错误
        }else {
            var info = imageInfo(data);
            var infoRealType = info.format.toLowerCase();
            if(pathType != "jpg" && pathType != "png" && pathType != "gif" && pathType != "svg"){
                return 1 //文件格式错误
            }else if(pathType != infoRealType){
                return 2 //文件格式与真实文件格式不相符
            }else if(parseFloat(folderPath.length/1024) > MaxSize){
                return 3 //文件超过最大上传格式
            }else {
                return 0 //文件格式正确
            }
        }
    },

    checkFileName : function(fName,fPath) {
        var folderPath = path.join(fPath,fName);
        return fs.existsSync(folderPath);
    },

    addInit : function(fName,fPath){
        if(checkFile.checkFileName(fName,fPath)){
            console.log(checkTips[0]);
            return false
        }else if(!checkFile.checkFileInfo(fName,fPath)){
            console.log(checkFileInfo(fName,fPath));
            return false
        }
    },

    removeInit : function(fName,fPath){
        if(!checkFile.checkFileName(fName,fPath)) {
            console.log(fName + checkTips[4]);
            return false
        }
    }
}
module.exports = {
    checkAddFile: checkFile.addInit,
    checkReFile: checkFile.removeInit,
}