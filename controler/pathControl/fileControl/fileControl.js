/**
 * Created by dragon.kuang on 2016/3/17.
 */

"use strict";

var path = require('path');
var fs = require('fs');
var walk = require('walk');
var check = require('./checkControl');
/**
 * 添加文件
 *
 */
var addFile = function(fName,fPath) {

}
/**
 * 删除文件
 *
 */
var delFile = function(fName,fPath) {
    if(check.checkReFile(fName,fPath)){
        var filePath = path.join(fPath + fName);
        fs.unlink(filePath, function(err){
            if(err){
                throw err;
            }
            console.log('文件:'+filepath+'删除成功！');
        })
    }
}
/**
 * 修改文件名称
 *
 */
var changeFile = function(fName,fPath,newName) {
    if(check.checkReFile(fName,fPath)){
        var filePath1 = path.join(fPath + fName);
        var filePath2 = path.join(fPath + newName)
        fs.rename(filePath1, filePath2, function(err){
            if(err){
                return
            }
            console.log('修改文件成功，' + fName + '已改为' + newName);
        });
    }

}
/**
 * 查找文件
 *
 */
var searchFile = function(fName,fPath) {
    var files   = [];
    var walker= walk.walk(fPath, { followLinks: false });
    walker.on('file', function(root, stat, next) {
        if(stat.name == fName){
            var filePath = path.join(root  + stat.name);
            files.push(filePath);
        }
        next();
    });
    walker.on('end', function() {
        if(files.length > 0){
            console.log(files);
        }else {
            console.log("没有该文件");
        }
    });
}

module.exports = {
    addFile: addFile,
    delFile: delFile,
    changeFile: changeFile,
    searchFile: searchFile
}
changeFile("detail.png","E:/porject/lakecloud/controler/pathControl/fileControl","detail2.png");