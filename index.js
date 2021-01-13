//importing packages
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ws: { intents: Discord.Intents.PRIVILEDGED }});
const enmap = require("enmap");
const db = require("quick.db");
client.commands = new enmap;

//get env config
require("dotenv").config();

//keep project alive
const keepAlive = require("./main/keepAlive.js");
keepAlive();

//varriables
let embed;

//bot login
client.login(process.env.TOKEN);

//on bot login
client.on("ready", () => {
    console.log(`${new Date()} Logged in as ${client.user.tag}!`);
    client.user.setActivity(process.env.STATUS);
    if (!db.get("count")){
        db.set("count", 0);
    }
    console.log(`Count: ${db.get("count")}`);
});

//on new user
client.on("guildMemberAdd", (member) => {
    if (!db.get(`users.${message.author.id}`)){
        db.set(`users.${message.author.id}.count`, 0);
    }
});

//on message
client.on("message", message => {
    if (!db.get(`users.${message.author.id}`)){
        db.set(`users.${message.author.id}.count`, 0);
    }
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.channel.id === process.env.COUNT_CHANNEL_ID){
        if(parseInt(message.content) === db.get("count") + 1){
            db.add(`users.${message.author.id}.count`, 1)
            db.add("count", 1)
            checkForRole(db.get(`users.${message.author.id}.count`), message);
            message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle(`Count Recived: ${db.get("count")}`).setTimestamp());
        } else {
            message.delete();
        }
    }
    checkForRole(db.get(`users.${message.author.id}.count`), message);
    if (message.content.startsWith(process.env.PREFIX)) {
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command);
        if (!cmd) return;
        cmd.run(client, message, args, db);
    }
});

//load commands
fs.readdir("./commands/", async (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let cmdName = file.split(".")[0];
        console.log(`Loaded Command "${cmdName}".`);
        client.commands.set(cmdName, props);
    });
});

function checkForRole(data, message){
    if(data >= 1){
        let role = message.guild.roles.cache.get(process.env.LEVEL_ONE_ID);
        message.member.roles.add(role);
    }
    if(data >= 10){
        let role = message.guild.roles.cache.get(process.env.LEVEL_TWO_ID);
        message.member.roles.add(role);
    }
    if(data >= 20){
        let role = message.guild.roles.cache.get(process.env.LEVEL_THREE_ID);
        message.member.roles.add(role);
    }
    if(data >= 50){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FOUR_ID);
        message.member.roles.add(role);
    }
    if(data >= 100){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FIVE_ID);
        message.member.roles.add(role);
    }
    if(data <= 1){
        let role = message.guild.roles.cache.get(process.env.LEVEL_ONE_ID);
        message.member.roles.remove(role);
    }
    if(data <= 10){
        let role = message.guild.roles.cache.get(process.env.LEVEL_TWO_ID);
        message.member.roles.remove(role);
    }
    if(data <= 20){
        let role = message.guild.roles.cache.get(process.env.LEVEL_THREE_ID);
        message.member.roles.remove(role);
    }
    if(data <= 50){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FOUR_ID);
        message.member.roles.remove(role);
    }
    if(data <= 100){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FIVE_ID);
        message.member.roles.remove(role);
    }
}
