var moment = require('moment');
module.exports = async (ctx, next) => {
    console.log('请求时间:' + moment().format('YYYY-MM-DD HH:mm:ss'));
    console.log('请求地址:' + ctx.request.url);
    console.log('------------------------------------------');
    ctx.response.body = {
        userId: 1,
        userName: 'King',
        mail: 'yanqing@zhongan.io'
    };
}