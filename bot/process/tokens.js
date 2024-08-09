const { createHmac } = require('node:crypto');
const {generate} = require("randomstring");
const connection = require("../../database");

async function CreateToken(discordId) {
    var token = createHmac('md5', discordId).digest("hex") + ":" + generate(32);

    await connection.execute("INSERT INTO `Tokens` (`Discord`, `Token`, `Date`)\n" +
        "VALUES (?, ?, now());", [discordId, token]);

    return token;
}

async function GetToken(token) {
    var data = await connection.execute("SELECT * FROM Tokens WHERE Token = ?", [token]);
    return data[0][0];
}

module.exports = { CreateToken, GetToken }