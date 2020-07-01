async function help(client, msg) {
    await msg.channel.send('도움말')
}


module.exports = [
    {
        cmd: "도움말",
        aliases: [],
        run: help
    }
]