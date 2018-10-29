const path = require('path');
const Models = require(path.join(appRoot, '/models/index'));
const sequelize = Models.sequelize;
const Constant = require(path.join(appRoot, '/common/configs/constant'));

module.exports = {
    login: async (ctx, next) => {
        try {
            const body = JSON.parse(JSON.stringify(Constant.API_RESULT_MODEL));
            let {stuNo, stuName} = ctx.request.body;
            let searchObj = {
                where: {
                    stuNo: stuNo,
                    stuName: stuName
                },
                raw: true
            };
            const userObj = await Models.stuUser.findOne(searchObj);
            if (userObj) {
                ctx.session.userId = userObj.userId;
                ctx.session.stuNo = userObj.stuNo;
                ctx.session.stuName = userObj.stuName;
                body.data = {
                    stuName:userObj.stuName
                };
                body.prompt = '操作成功';
                body.retCode = Constant.API_SUCCEED_CODE;
                ctx.body = body;
            }
            else {
                body.prompt = '不存在该用户！';
                body.retCode = Constant.API_DATA_WRONG_CODE;
                ctx.body = body;
            }
        }
        catch (e) {
            body.prompt = '服务器错误';
            body.error = e.message;
            body.retCode = Constant.API_SERVER_WRONG_CODE;
            ctx.body = body;
        }
    }
}
;