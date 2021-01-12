exports.run = (client, message, args, db) => {
    Discord = require("discord.js");
    fs = require("fs");
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(!args || !args[1] || args[2] || !parseInt(args[1]) || args[0] !== "set") return message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle("Please use !count set <number>.").setTimestamp());
    db.count = parseInt(args[1]);
    fs.writeFile("./data/database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
    });
    message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle(`Set current count to ${args[1]}, next number: ${db.count + 1}`))
};
exports.help = {
  name:""
};