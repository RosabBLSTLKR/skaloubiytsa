const { getMember, formatDate } = require(`../../functions.js`);
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
module.exports={
    name: "userinfo",
    aliases: ["userinfo", "user", "who"],
    category: "statusinfo",
    description: "Gives users' info",
    usage: "[username | id, | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));
        const joined = formatDate(member.joinedAt);
        const role = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none"

        const created = formatDate(member.user.createdAt);
        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            
            .addField('Member information', stripIndents`**>Displayed name:** ${member.displayName}
            **>Joined at:** ${joined}
            **>Roles:** ${role}`, true)

            .addField('User information', stripIndents`**>ID:** ${member.user.id}
            **>Username:** ${member.user.username}
            **>Discord tag:** ${member.user.tag}
            **>Created at:** ${created}`, true)
            .setTimestamp()

            if(member.user.presence.game){
                embed.addField('Currently playing', `**>Name:** ${member.user.presence.game.name}`)
            }
            message.channel.send(embed);
    }
}