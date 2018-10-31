const path = require('path');
const titleArr = ['调用时间', 'apiUrl', 'IP', '状态码', '调用结果', '错误信息'];
const widthArr = [22, 50, 15, 10, 20, 50];
const backFilePath = path.join(appRoot, '/common/logs/backApiLogs.txt');
const frontFilePath = path.join(appRoot, '/common/logs/frontApiLogs.txt');
const maxLength = 3;

exports.frontLoggerConfig = {
    titleArr : titleArr,
    theWidth : widthArr,
    filePath : frontFilePath,
    maxLength: maxLength
};
exports.backLoggerConfig = {
    titleArr : titleArr,
    theWidth : widthArr,
    filePath : backFilePath,
    maxLength: maxLength
};

