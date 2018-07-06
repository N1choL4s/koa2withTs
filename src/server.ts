import * as Koa from 'koa';
import * as Router from 'koa-router';
const cors = require('kcors');
const bodyParser = require('koa-bodyparser')
const proxy = require('koa2-proxy')
const http = require('http');
const qs = require('querystring');
import { userController } from './controller/userController'

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());
app.use(cors());
app.use(async (ctx, next) => {
    console.log(ctx.url)
    if(ctx.url.startsWith('/api')) {
        return proxy({
            target: 'http://47.94.133.206:8082', // 服务器地址
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api' : '/api'
            }
        })(ctx.req, ctx.res, next)
    }

    ctx.set("Access-Control-Allow-Origin", 'http://localhost:63342')
    ctx.set("Access-Control-Allow-Credentials", 'true');
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

    await next()
});


router.get('/imgCode', userController.verifyCodeImage);

router.post('/login', userController.login);

app.listen(3000);

console.log('Server running on port: 3000');