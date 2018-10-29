const devLogger = require('./devLogger');
const commonLogger = require('./commonLogger');
function createLogger(flag,opts) {
    if(flag === 'dev')
        return devLogger();
    else if(flag === 'common')
        return commonLogger(opts);
    else
        throw new Error('无效标识');
}

module.exports = createLogger;