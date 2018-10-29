const fs = require('fs');
const path = require('path');
const stringWidth = require('string-width');

exports.errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        //console.error(err);
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            retCode: -500,
            prompt: '服务器错误',
            error: err.message
        };
    }
};
//在index文件下组装模块
exports.assemble = (module, filePath, basename, callback) => {
    fs
        .readdirSync(filePath)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(function (file) {
            let model = require(path.join(filePath, file));
            let modelName = file.slice(0, -3);
            module[modelName] = model; //使module.modelName 指向一个model
        });
    callback(module);
};


//定制promise写文件
exports.writeFile = function (fileName, data,opt) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, data, {flag: 'a+'}, (error) => {
            if (error) return reject(error);
            resolve(1);
        });
    });
};

exports.readFile = function (fileName,opt) {
    return new Promise((resolve,reject) =>{
        fs.readFile(fileName,opt,(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
};
//输出指定宽度字符串
exports.widthString = function widthString(strArr, width) {
    let result = '',
        item, dif, i, wid, itemLen, arrLen = strArr.length;
    if (typeof width === 'object') {
        for (i = 0; i < arrLen; i++) {
            item = strArr[i];
            wid = width[i] ? width[i] : 20;
            itemLen = stringWidth(item);
            if (itemLen >= wid) {
                result += item.substr(0, wid);
            }
            else {
                dif = wid - itemLen;
                result += item;
                result += ' '.repeat(dif);
            }
        }
        return result + '\r\n';
    }
    else if (typeof width === 'number') {
        for (i = 0; i < arrLen - 1; i++) {
            item = strArr[i];
            itemLen = stringWidth(item);
            if (itemLen >= width) {
                result += item.substr(0, width);
            }
            else {
                dif = width - itemLen;
                result += item;
                result += ' '.repeat(dif);
            }
        }
        return result + strArr[arrLen - 1] + '\r\n';
    }
    else
        throw new Error('无效宽度!');
};

exports.loginAuth = async (ctx,next)=>{
    const session = ctx.session;
    if(session.userId||ctx.url === "/front/" ||ctx.url === "/front/index"||ctx.url === "/front/api/auth/login")
        return next();
    ctx.redirect("/front/");
};