const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");

const prefix = `!`;

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/auth.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(process.env.token);

client.on('ready', () => {
    console.log(`${client.user.username} is exploring the space!`);
    client.user.setPresence({
        activity: {
            name: `Startup complete. Working at 100%`
        },
        status: 'idle'
    });
});

client.on(`guildMemberAdd`, async(member) => {
    const role = message.guild.roles.cache.get(`634116418010611747`);
    guildMember.roles.add([role]).catch(console.error);
});

client.on('message', async(message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if(cmd.lenth === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        command.run(client, message, args);
    }
});


