const env = require("./env");

class Club {
    percent;
    role;
    constructor(percent, role) {
        this.percent = percent;
        this.role = role;
    }
}
var Clubs = [];
Clubs.push(new Club(95, env.role95))
Clubs.push(new Club(90, env.role90))
Clubs.push(new Club(80, env.role80))
Clubs.push(new Club(60, env.role60))
Clubs.push(new Club(40, env.role40))

module.exports = { Clubs }