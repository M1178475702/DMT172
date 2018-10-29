const path = require('path');
const titleArr = ['调用时间', 'apiUrl', 'IP', '状态码', '调用结果', '错误信息'];
const widthArr = [22, 50, 15, 10, 20, 50];
const filePath = path.join(appRoot, '/common/logs/backApiLogs.txt');
const maxLength = 3;

module.exports = {
    titleArr : titleArr,
    theWidth : widthArr,
    filePath : filePath,
    maxLength: maxLength
};