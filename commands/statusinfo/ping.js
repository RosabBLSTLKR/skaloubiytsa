module.exports = {
    name: "ping",
    category: "statusinfo",
    description: "Returns latency for the user",
    run: async (client, message, args) => {
            const msg = await message.channel.send(`I received your ping, ${message.author}. Calculating time...`);
    
            msg.edit(`Complete! Time elapsed: ${Math.floor(msg.createdAt - message.createdAt)}ms`)
    
    }
}