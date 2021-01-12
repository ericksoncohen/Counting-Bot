exports.run = (client, message, args, db) => {
    Discord = require("discord.js");
    fs = require("fs");
    if(!args[0] || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle(`Count is: ${db.count}`).setTimestamp())
    if(args[0] != "set") return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle("Please use !count set <number>.").setTimestamp());
    if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle("Please use !count set <number>.").setTimestamp());
    if(args[1] === "0" && args[0] === "set" && !args[2]) {
        db.count = 0
        fs.writeFile("./data/database.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
        });
        return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle(`Set current count to ${db.count}, next number: ${db.count + 1}`).setTimestamp())
    }
    if(!parseInt(args[1]) || args[2]) return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle("Please use !count set <number>.").setTimestamp());
    if(args[0] === "set"){
        db.count = parseInt(args[1]);
        fs.writeFile("./data/database.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
        });
        return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle(`Set current count to ${db.count}, next number: ${db.count + 1}`).setTimestamp())
    }
};