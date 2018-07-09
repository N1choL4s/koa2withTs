import * as Koa from 'koa';
import * as Router from 'koa-router';
const path = require('path')
const cors = require('kcors');
const proxy = require('http-proxy-middleware')
const bodyParser = require('koa-bodyparser')
const http = require('http');
const qs = require('querystring');
const views = require('koa-views');
const koaStatic = require('koa-static');
import { userController } from './controller/userController'

const app = new Koa();
const router = new Router();

// 使用表单解析中间件
app.use(bodyParser());
app.use(router.routes());
app.use(cors());

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, '.', 'views')
));

// 配置服务端模板渲染引擎中间件
app.use(views(
    __dirname + '/views',
    {
        map:{
            html: 'underscore'
        }
    }
));
app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", 'http://localhost:8086')
    ctx.set("Access-Control-Allow-Credentials", 'true');
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    console.log(ctx.url);
    /*if(ctx.url.startsWith('/api')) {
        return proxy({
            target: 'http://localhost:3000', // 服务器地址
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api' : '/api'
            }
        })(ctx.req, ctx.res, next)
    }*/
    await next()
});


router.get('/api/imgCode', userController.verifyCodeImage);

router.post('/api/login', userController.login);

app.listen(3000);

console.log('Server running on port: 3000');