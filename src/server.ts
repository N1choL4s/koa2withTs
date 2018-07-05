import * as Koa from 'koa';
var bodyParser = require('koa-bodyparser')
import * as Router from 'koa-router';
const app = new Koa();

const router = new Router();

// post
var http = require('http');
var qs = require('querystring');

app.use(bodyParser());

app.use(router.routes());

app.use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", 'http://localhost:63342')
    ctx.set("Access-Control-Allow-Credentials", 'true');
    ctx.set("Access-Control-Max-Age", '86400000');
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    await next()
});

router.get('/testLogin', async(ctx: any)=>{

    // http://39.106.35.106:8082/api/isLogin

    var post_data = qs.stringify({
        'phone' : '15801073139',
        'loginpass': '111111',
        'code': '1234'
    });

    var options = {
        hostname: '39.106.35.106',
        port: 8082,
        path: '/api/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    var req = http.request(options, function (res: any) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk: any) {
            console.log('BODY: ' + chunk);
        });
    });

    req.write(post_data);

    req.on('error', function (e: any) {
        console.log('problem with request: ' + e.message);
    });

    req.end()
    ctx.body = 'Hello World';
});

router.post('/login', async function(ctx: any, next) {
    console.log(JSON.stringify(ctx.request.body));

})

app.listen(3000);

console.log('Server running on port: 3000');