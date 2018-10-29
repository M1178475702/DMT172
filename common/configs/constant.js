//服务器常量

module.exports = {
    API_RESULT_MODEL: {
        "data": {},   // 数据
        "error": "",  //错误信息
        "prompt": "", //操作结果信息
        "retCode": 0  //retCode: 0正常 -500服务器错误或数据库错误 -1单条数据查询为空（出错）
    },
    API_SUCCEED_CODE : 0,               //接口成功code
    API_SERVER_WRONG_CODE : -500,       //服务器错误code
    API_DATA_WRONG_CODE : -1,           //服务器数据错误code
};