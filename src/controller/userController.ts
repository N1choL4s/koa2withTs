var request = require('superagent');
import {loginObj} from "../entity/loginObj";

export class userController {

    // login
    static async login (ctx: any, next: any) {
        let postLoginData = new loginObj(
            ctx.request.body.phone,
            ctx.request.body.loginpass,
            ctx.request.body.code
        );
        let res = await request
            .post('http://47.94.133.206:8082/api/login')
            .type('form')
            .send(postLoginData);
        if(res){
            console.log(res.text);
            ctx.body = res.text;
        }
    }

    // verifyCodeImage
    static async verifyCodeImage(ctx: any, next: any) {
        let res = await request
            .get('http://47.94.133.206:8082/api/imgcode.jsp?rnd=' + Math.random());
        if(res){
            console.log(res.body);
            ctx.body = res.body;
        }
    }

}


