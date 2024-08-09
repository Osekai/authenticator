const connection = require("../../database");

class User {
    osuId = null;
    discordId = null;

    constructor(osuid = null, discordid = null) {
        this.discordId = discordid;
        this.osuId = osuid;
    }
}

class UserReprocess {
    static Queue = [];

    static async ProcessUser(user) {
        console.log("processing " + user.osuId);
        return {}; // todo
    }

    static async StartQueue() {
        while (UserReprocess.Queue.length > 0) {
            const batch = UserReprocess.Queue.splice(0, 5);


            const promises = batch.map(user => UserReprocess.ProcessUser(user));
            await Promise.all(promises);
        }

        setTimeout(UserReprocess.StartQueue, 100);
    }

    static AddUserToQueue(user, position = "last") {
        if (position === "last") UserReprocess.Queue.push(user); else UserReprocess.Queue = [user, ...UserReprocess.Queue]
    }

    static async AddNewUser(user) {
        console.log(user);
        var exists = await this.GetUserStored(user);
        await connection.execute(`INSERT INTO Users (Discord, Osu, Medals)
                                  VALUES (?, ?, '-1');`, [user.discordId, user.osuId]);
        UserReprocess.AddUserToQueue(user);
        return "yes";
    }

    static async GetUserStored(user) {
        var discord = user.discordId;
        var osu = user.osuId;

        if(typeof(osu) == "undefined") osu = null;
        if(typeof(discord) == "undefined") discord = null;

        console.log("--")
        console.log(osu);
        console.log(discord);
        console.log("--")

        var data = null;
        if (discord !== null && osu == null) {
            [data] = await connection.execute("SELECT * FROM Users WHERE Discord = ?", [discord]);
        }
        if (osu !== null) {
            if (discord === null) {
                [data] = await connection.execute("SELECT * FROM Users WHERE Osu = ?", [osu]);
            } else {
                [data] = await connection.execute("SELECT * FROM Users WHERE Osu = ? AND Discord = ?", [osu, discord]);
            }
        }

        console.log(data);

        return data[0];
    }
}

module.exports = {UserReprocess, User};