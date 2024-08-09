const {env} = require("../env");
const passport = require("passport");
const OsuStrategy = require("passport-osu");
const {v2, auth} = require('osu-api-extended')
const {GetToken} = require("../bot/process/tokens");
const {UserReprocess} = require("../bot/process/users");
const {User} = require("../bot/process/users");

class Web {
    session;

    constructor() {
        this.session = require('express-session')
    }

    async start() {
        console.log("running web!");

        const express = require("express");
        const app = express();
        const port = 3000;

        app.use(this.session({secret: 'j31rfh03hfr103f1n', cookie: {maxAge: 5000}}));

        app.get("/", function (req, res) {
            res.send("Hello World!");
        });

        app.listen(port, function () {
            console.log(`Example app listening on port ${port}!`);
        });

        const authuser = async function authenticate(token, osuid) {
            var data = await GetToken(token);
            console.log(data);
            await UserReprocess.AddNewUser(new User(osuid, data.Discord));
        }

        // - /auth/{token}
        // if user is not logged in, set cookie then redirect to /login/
        // - /login/
        // if get request has "code" do oauth then go back to auth url, else redirect to login url

        app.get("/auth/:token", function (req, res) {
            req.session.loggedIn = false;
            req.session.token = req.params.token;
            res.redirect("/login");
        });
        app.get("/login", async function (req, res) {
            const {code} = req.query;


            var redirect = env.url + "/login";
            const oauthUrl = "https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=" + env.clientId + "&redirect_uri=" + redirect;

            if (code) {
                const user_data = await auth.authorize(code, 'osu', env.clientId, env.clientSecret, redirect);
                console.log(user_data);
                await authuser(req.session.token, user_data.id);
                res.send(`Authenticated with user: ${user_data.username}`);
            } else {
                // User needs to authenticate via OAuth, redirect to OAuth provider
                // This is just an example URL, replace it with your OAuth provider's URL
                res.redirect(oauthUrl);
            }
        });
    }
}

module.exports = {Web}