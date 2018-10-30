module.exports = {
    key: 'stu:session',
    overwrite: false,
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    signed: true
};