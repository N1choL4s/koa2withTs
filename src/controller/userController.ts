const request = require('superagent');
const events = require('events')
import { loginObj } from "../entity/loginObj";
import { httpHeaders } from '../config/httpConfig'

var httpConfig: object;

export class userController {

    // login
    static async login (ctx: any, next: any) {
        let postLoginData = new loginObj(
            ctx.request.body.loginName,
            ctx.request.body.loginpass,
            ctx.request.body.code
        );
        console.log(postLoginData)
        console.log(httpConfig.serverCookie)
        let res = await request
            .post('http://localhost:8086/manage/bms/user/login')
            .set('Cookie', httpConfig.serverCookie)
            .type('form')
            .send(postLoginData)
            .withCredentials();
        if(res){
            console.log(res.text);
            ctx.body = res.text;
        }
    }

    // verifyCodeImage
    static async verifyCodeImage(ctx: any, next: any) {
        httpConfig = new httpHeaders(ctx.request.headers.cookies);
        console.log(httpConfig.serverCookie);
        let res = await request
            .get('http://localhost:8086/manage/bms/user/sendCaptcha?rnd=' + Math.random());
        if(res){
            console.log(res.body);
            ctx.body = res.body;
        }
    }

}


