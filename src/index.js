const walk = require('walk')
const path = require('path')
const discord = require('discord.js')
require('dotenv').config()
const {Client, Collection} = discord
const locale = require('./locale')
const lang = "kr"

Client.prototype.commands = new Collection()
Client.prototype.aliases = new Collection()

const client = new Client()


const walker = walk.walk(path.join(__dirname, 'commands'))

String.prototype.uid = function() {
    return this.match(/[^!<>@]/gi).join('')
}

walker.on('file', (root, file, next) => {
    if (file.name.endsWith('.commands.js')) {
        console.log(path.join(root, file.name))
        const commands = require(path.join(root, file.name))
        commands.forEach(k => {
            client.commands.set(k.cmd, k)
            for (let alias of k.aliases) {
                client.aliases.set(alias, k.cmd)
            }
        });
        next()
    }
    next()
})

function runCommand(command, message, args, prefix, locale) {
    if (client.commands.get(command) || client.aliases.get(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        if (cmd) cmd.run(client, message, args, locale, prefix); return
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async msg => {
    const prefix = "피코야 "
    if (!msg.content.startsWith(prefix)) return
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    try {
        runCommand(cmd, msg, args, prefix, locale[lang])
    } catch(e) {
        console.error(e)
    }
})

client.login(process.env.BOT_TOKEN)
