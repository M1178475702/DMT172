/**
 *  证书：数据库链接配置
 */
module.exports = {
    mysql: {
        dev: {
            database:'dmt2017',
            username:'dmt2017',
            password:'cmfs123',
            host:   '123.59.128.170',
            port:   '3306'
        },
        prod: {
            connectionString: 'mysql://dmt2017:cmfs123@123.59.128.170:3306/dmt2017?dateStrings=true&connectionLimit=10'
        }
    }
};

