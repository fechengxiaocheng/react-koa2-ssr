var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var views = require('koa-views');
var path = require('path');
var webpack = require('webpack');
var colors = require('colors');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var config = require('config');
var ejs = require('ejs');

var devConfig = require('../webpack/webpack.dev');
var prdConfig = require('../webpack/webpack.prd');

var env = config.env;

// koa路由模块
var api = require('./controller/api');
var render = require('./controller/render');

// 不同环境选用不同webpack配置
var compile = webpack(devConfig);

// 端口设置
var PORT = config.port || 8080;

console.log(`---------------------------\n\n环境：${env}`.red);
console.log(`端口：${PORT}\n\n---------------------------`.red);

var app = new Koa();
var router = new Router();

app.use(router.routes()).use(router.allowedMethods());

app.use(bodyParser());

// error
app.on('error', (err, ctx) => {
    if (ctx.request.url !== '/__webpack_hmr') {
        console.error('错误信息:', err);
        console.error('错误信息请求地址:', ctx.request.url);
        console.log('------------------------------------------');
    }
});

// 开发环境启用devserver
if (env === 'development') {
    app.use(webpackDevMiddleware(compile, {
        noInfo: false,
        publicPath: devConfig.output.publicPath,
        stats: {
            colors: true
        }
    }));

    app.use(webpackHotMiddleware(compile));
}

app.use(require('koa-static')(path.join(__dirname, config.dirname)));

app.use(views(path.join(__dirname, config.dirname), {
    extension: 'html'
}));

router.get('*', render);

router.all(/^\/api/, api);

app.listen(PORT);