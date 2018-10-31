const os = require('os');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const schedule = require('node-schedule');
const {writeFile, readFile, widthString} = require(path.join(appRoot, 'common/helpers/serverHelper'));

//定制文件日志
function logger(opts) {
    let {titleArr, theWidth} = opts;
    if (!titleArr || titleArr.length === 0)
        throw new Error('标题数组不存在或没有元素');
    if (!theWidth)
        throw new Error('必须用数组或数字指定宽度');

    const colLength = titleArr.length;
    let widthArr = [];
    if (typeof theWidth === "number") {
        for (let i = 0; i < colLength; i++)
            widthArr.push(theWidth);
    }
    else
        widthArr = theWidth;

    const logBuffer = [];
    const maxLength = opts.maxLength ? opts.maxLength : 5;
    const filePath = opts['filePath'] ? opts['filePath'] : os.tmpdir() + 'backApiLogs.txt';

    let log = widthString(titleArr, widthArr);

    fs.writeFileSync(filePath, log, {flag: 'w'});

    schedule.scheduleJob({hour: 1, minute: 0, second: 0}, () => {
        clearBuffer();
    });
    return async (ctx, next) => {
        try {
            await next();
        }
        catch (err) {
            console.error(err);
            await createLog(ctx.url, ctx.ip, ctx.status.toString(), ctx.body ? ctx.body.prompt : '默认', err);
        }
        await createLog(ctx.method.toUpperCase() + ' ' + ctx.url, ctx.ip, ctx.status.toString(), ctx.body ? ctx.body.prompt : '默认');
    };

    function clearBuffer() {
        while (logBuffer.length) {
            writeFile(filePath, logBuffer.shift());
        }
    }

    async function createLog(apiUrl, ip, statusCode, result, err) {
        try {
            const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let infoArr = [date, apiUrl, ip, statusCode, result];
            if (err) infoArr.push(err.message);
            const log = widthString(infoArr, widthArr);
            logBuffer.push(log);
            if (logBuffer.length >= maxLength)
                clearBuffer();
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }


}


module.exports = logger;






