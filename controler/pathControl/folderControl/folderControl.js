/**
 * Created by dragon.kuang on 2016/3/17.
 */

"use strict";

var path = require('path');
var fs = require('fs');
var walk = require('walk');
/**
 * 添加目录
 *
 */
var addFolder = function(fName,fPath) {
    var folderPath = path.join(fPath,fName);
    if(!fs.existsSync(folderPath)){
        fs.mkdir(folderPath, function(err){
            if(err){
                console.log(fName + '目录创建失败');
            }else{
                console.log(fName + '目录创建成功');
            }
        });
    }else {
        console.log(fName + '目录已经存在');
    }
}
/**
 * 删除目录
 *
 */
var delFolder = function(fName,fPath) {
    var folderPath = path.join(fPath,fName);
    if (fs.existsSync(folderPath)) {
        fs.rmdir(folderPath, function(err){
            if(err){
                console.log(fName + '目录删除失败');
            }else{
                console.log(fName + '目录删除成功');
            }
        });
    }else {
        console.log(fName + '目录不存在');
    }
}
/**
 * 修改目录名称
 *
 */
var changeFolder = function(fName,newName,fPath) {
    var folderPath = path.join(fPath,fName);
    var folderNewPath = path.join(fPath,newName);
    fs.rename(folderPath,folderNewPath,function(err){
        if(err){
            console.log("重命名失败！");
        }else{
            console.log("重命名成功！");
        }
    });
}
/**
 * 查找目录内容
 *
 */
var searchFolder = function(fPath) {
    var fileList = [];
    var dirList = fs.readdirSync(fPath);
    dirList.forEach(function(item){
        fileList.push(fPath + '/' + item);
    })
    console.log(fileList);
}
var searchFolder2 = function(fPath) {
    var files   = [];
    var walker= walk.walk(fPath, { followLinks: false });
    walker.on('file', function(root, stat, next) {
        files.push(root + '/' + stat.name);
        next();
    });
    walker.on('end', function() {
        console.log(files);
    });
}
module.exports = {
    addFolder: addFolder,
    delFolder: delFolder,
    changeFolder: changeFolder,
    searchFolder: searchFolder
}
searchFolder('E:/porject/nodepay/hexo/blog');