const request = require('superagent');
const events = require('events')
import { loginObj } from "../entity/loginObj";

export class userController {

    constructor(
        protected _serverCookie: string
    ){}

    // login
    static async login (ctx: any, next: any) {
        let postLoginData = new loginObj(
            ctx.request.body.loginName,
            ctx.request.body.loginpass,
            ctx.request.body.code
        );
        console.log(postLoginData)
        console.log(this._serverCookie)
        let res = await request
            .post('http://localhost:8086/manage/bms/user/login')
            .set('Cookie', httpConfig._serverCookie)
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
        this._serverCookie = ctx.request.headers.cookies;
        console.log(this._serverCookie);
        let res = await request
            .get('http://localhost:8086/manage/bms/user/sendCaptcha?rnd=' + Math.random());
        if(res){
            console.log(res.body);
            ctx.body = res.body;
        }
    }

}


