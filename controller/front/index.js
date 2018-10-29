/**
 * @name front controller index
 */
const path = require('path');
const basename = path.basename(module.filename);
const serverHelper = require(path.join(global.appRoot, '/common/helpers/serverHelper'));

serverHelper.assemble({}, __dirname, basename, (frontController)=> {
    module.exports = frontController;
});