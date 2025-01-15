const discord = require('discord.js');
const cfg = require('./config.json');
const client = new discord.Client();

client.login(cfg.token);

client.once('ready', () => {
    console.log(`${client.user.username} is exploring the space!`);
    client.user.setPresence({
        activity: {
            name: `Startup complete. Working at 100%`
        },
        status: 'idle'
    });
});




