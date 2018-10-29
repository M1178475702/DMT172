/**
 * @name back controller index
 */
const path = require('path');
const basename = path.basename(module.filename);
const serverHelper = require(path.join(global.appRoot, '/common/helpers/serverHelper'));

serverHelper.assemble({}, __dirname, basename, function (backController) {
    module.exports = backController;
});