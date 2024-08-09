

const {env} = require("./env");
const {Clubs} = require("./clubs");
const {Bot} = require("./bot/bot");
const {Web} = require("./web/web");


console.log(env);
console.log(Clubs)


const bot = new Bot();
const web = new Web();

Promise.all([bot.start(), web.start()])