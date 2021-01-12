//importing packages
const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client({ws: { intents: Discord.Intents.PRIVILEDGED }});
const enmap = require("enmap");
client.commands = new enmap;

//get env config
require('dotenv').config();

//keep project alive
const keepAlive = require("./main/keepAlive.js");
keepAlive();

//count database
let db = JSON.parse(fs.readFileSync("./data/database.json", "utf8"));
fs.writeFile("./data/database-old.json", JSON.stringify(db), (x) => {
    if (x) console.error(x)
});

//varriables
let embed;

//bot login
client.login(process.env.TOKEN);

//on bot login
client.on('ready', () => {
    console.log(`${new Date()} Logged in as ${client.user.tag}!`);
    client.user.setActivity(process.env.STATUS);
    console.log(`Count: ${db.count}`);
});

//on new user
client.on('guildMemberAdd', (member) => {
    //set the users count to 0 if they have no data
    if(!member.user.id){
        db[member.user.id] = {
            count: 0
        };
    }
    //save data to database
    fs.writeFile("./data/database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
    });
});

//on message
client.on('message', message => {
    if (!db.count){
        db.count = 0
        fs.writeFile("./data/database.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
        });
    }
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.channel.id === process.env.COUNT_CHANNEL_ID){
        if(!db[message.author.id]) db[message.author.id] = {
            count: 0
        }
        if(parseInt(message.content) === db.count + 1){
            db[message.author.id].count++
            db.count++;
            message.channel.send(new Discord.MessageEmbed().setColor(process.env.COLOR).setTitle(`Count Recived: ${db.count}`).setTimestamp());
        } else {
            message.delete();
        }
        return fs.writeFileSync("./data/database.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
        });
    }
    if(!db[message.author.id]) db[message.author.id] = {
        count: 0
    }
    fs.writeFile("./data/database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
    });
    if(db[message.author.id].count >= 1){
        let role = message.guild.roles.cache.get(process.env.LEVEL_ONE_ID);
        message.member.roles.add(role);
    }
    if(db[message.author.id].count >= 10){
        let role = message.guild.roles.cache.get(process.env.LEVEL_TWO_ID);
        message.member.roles.add(role);
    }
    if(db[message.author.id].count >= 20){
        let role = message.guild.roles.cache.get(process.env.LEVEL_THREE_ID);
        message.member.roles.add(role);
    }
    if(db[message.author.id].count >= 50){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FOUR_ID);
        message.member.roles.add(role);
    }
    if(db[message.author.id].count >= 100){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FIVE_ID);
        message.member.roles.add(role);
    }
    if(db[message.author.id].count <= 1){
        let role = message.guild.roles.cache.get(process.env.LEVEL_ONE_ID);
        message.member.roles.remove(role);
    }
    if(db[message.author.id].count <= 10){
        let role = message.guild.roles.cache.get(process.env.LEVEL_TWO_ID);
        message.member.roles.remove(role);
    }
    if(db[message.author.id].count <= 20){
        let role = message.guild.roles.cache.get(process.env.LEVEL_THREE_ID);
        message.member.roles.remove(role);
    }
    if(db[message.author.id].count <= 50){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FOUR_ID);
        message.member.roles.remove(role);
    }
    if(db[message.author.id].count <= 100){
        let role = message.guild.roles.cache.get(process.env.LEVEL_FIVE_ID);
        message.member.roles.remove(role);
    }
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
        console.log(`Loaded Command '${cmdName}'.`);
        client.commands.set(cmdName, props);
    });
});