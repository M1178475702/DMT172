/**
 *  证书：数据库链接配置
 */
module.exports = {
    mysql: {
        dev: {
            database:'hga_dev',
            username:'hga',
            password:'hga123',
            host:   '123.59.128.170',
            port:   '3306'
        },
        prod: {
            connectionString: 'mysql://hga:hga123@123.59.128.170:3306/hga_dev?dateStrings=true&connectionLimit=10'
        }
    }
};

