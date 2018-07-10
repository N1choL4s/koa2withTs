const request = require('superagent');
const events = require('events')
import { loginObj } from "../entity/loginObj";

let setResCookie = (resCookie: any) => {
    _serverCookie = resCookie[0]
}

let _serverCookie: string;

export class userController{

    // login
    static async login (ctx: any, next: any) {
        let postLoginData = new loginObj(
            ctx.request.body.loginName,
            ctx.request.body.loginpass,
            ctx.request.body.code
        );
        console.log(postLoginData)
        let res = await request
            .post('http://localhost:8086/manage/bms/user/login')
            .set('Cookie', _serverCookie)
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
        let res = await request
            .get('http://localhost:8086/manage/bms/user/sendCaptcha?rnd=' + Math.random());
        if(res){
            setResCookie(res.headers['set-cookie']);
            ctx.body = res.body;
        }
    }

}


