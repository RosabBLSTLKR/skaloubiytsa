module.exports = {
    name: "join",
    category: "interaction",
    description: "Asigns role for those who missed that assigment",
    usage: "<input>",
    run: async (client, message, args) => {
            const guildMember = message.member;
            message.channel.send(`We're on the half of the way ${message.author}... Just a little bit more...`);

            const role = message.guild.roles.cache.get(`634116418010611747`);

            guildMember.roles.add([role]).catch(console.error);    
    }
}