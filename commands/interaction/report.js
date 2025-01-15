const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember } = require("../../functions.js")

module.exports = {
    name: "report",
    category: "interaction",
    description: "Reports guilty members(for whatether reason)",
    usage: "<mention | id>",
    run: async (client, message, args) => {
        if(message.deletable) message.delete();
        let rmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!rmember) {
            return message.reply("It appears that's the void! There's no one with that name.").then(message => { message.delete({timeout: 10000}) });
        }
        if(rmember.user.bot) {
            return message.reply("Either you're a rebel or just trying to mess. Not today.").then(message => { message.delete({timeout: 10000}) });
        }
        if(rmember.hasPermission("BAN_MEMBERS")) {
            let reported = getMember(message, args.join(" "));
            let reportedrole = reported.roles.cache.first();
            let reporter = message.member.roles.cache.first();
            if(reporter.rawPosition < reportedrole.rawPosition) {
                return message.reply(`That person is from a rank higher than yours. I will not do that.`).then(message => { message.delete({timeout: 10000}) });
            }
        }
        if(!args[1]) {
            return message.reply("There should be a reason you're donig this. I can't do that just for fun...").then(message => { message.delete({timeout: 10000}) });
        }
        const channel = message.guild.channels.cache.find(channel => channel.name === "reporting");
        if(!channel) {
            return message.reply(`No #${channel} channel found! Ask the owner to create or change the channel.`).then(message => { message.delete({timeout: 10000}) });
        }
        const embed = new MessageEmbed()
            .setColor("ff3333")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor(`New Report`)
            .setDescription(stripIndents`**>Naughty one:** ${rmember} (${rmember.id})
            **>Reported by:** ${message.member} (${message.member.id})
            **>Reported in:** ${message.channel}
            **>Reason:** ${args.slice(1).join(" ")}`)

        return channel.send(embed);
    }
}