/*

This file has helper functions for the bot
Nothing in this file should be adjusted

*/

const { GuildMember } = require("discord.js")
const ids = require("./ids.js")

module.exports = {
  isBeta: (id) => {
    return ["801726595378315264", "719564153072910407", "406412325973786624", "439223656200273932", "159717599993790464", "452632560795648000", "517335997172809728"].includes(id) ? true : false
  },
}

module.exports.isNarrator = (user) => {
  if (!user.guild) throw new Error("Not a guild member")
  let narroles = user.guild.id == ids.server.sim ? [ids.minisim, ids.narratorsim] : [ids.mini, ids.narrator]
  let isNarr = user.roles?.cache.filter((x) => narroles.includes(x.id))
  if (isNarr.map((x) => x.id).length > 0) return true
  return false
}
module.exports.isStaff = (user) => {
  if (!user.guild) throw new Error("Please pass a guildmember")
  let member = user.client.guilds.cache.get(ids.server.sim).members.cache.get(user.id)
  if (member.roles.cache.has(ids.staff) || member.roles.cache.has(ids.afkstaff)) return true
  return false
}

module.exports.updateXP = async (id, client) => {
  let guy = client.users.cache.get(id)
  let level = client.db.get(`level_${guy.id}`)
  let data = await client.dbs.players.findOne({ user: id })
  let xp = data.xp
  let req = module.exports.nextLevel(level)
  if (xp > req) {
   data.inventory.lootbox = data.inventory.lootbox + 1
    client.db.add(`level_${guy.id}`, 1)
    guy.send(`Congrats! You have reached Level ${client.db.get(`level_${guy.id}`)}!\n\nYou have recieved a lootbox. To open it, do \`+use lootbox\`.`)
    module.exports.updateXP(id, client)
    data.save()
  }
}

module.exports.nextLevel = (level = 0) => {
  return 500 + 500 * (0.5 * level)
}

module.exports.emote = (name, client) => {
  if (!client) return "Client not given"
  let e = client.emojis.cache.find((emoji) => emoji.name.toLowerCase() == name.toLowerCase().replace(/ /g, "_"))?.toString()
  if (e) return e
  return ""
}

module.exports.getUser = (input, message) => {
  if (!input) return message.member
  input.replace(/([<@!>])+/g, "")
  let target = message.guild.members.cache.get(input)
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.tag === input || member.user.id === input || member.user.username === input || (member.nickname !== null && member.nickname === input))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.username.toLowerCase() + "#" + member.user.discriminator === input.toLowerCase() || member.user.username.toLowerCase() === input.toLowerCase() || (member.nickname !== null && member.nickname.toLowerCase() === input.toLowerCase()))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.username.startsWith(input) || member.user.username.toLowerCase().startsWith(input.toLowerCase()))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => (member.nickname !== null && member.nickname.startsWith(input)) || (member.nickname !== null && member.nickname.toLowerCase().startsWith(input.toLowerCase())))
  }
  if (target == null) {
    target = message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(input.toLowerCase()) || (member.nickname !== null && member.nickname.toLowerCase().includes(input.toLowerCase())))
  }
  return target
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports.getEmoji = (name, client) => {
  return client.emojis.cache.find(emoji => emoji.name.toLowerCase() == name.toLowerCase())
}

module.exports.peaceCheck = (message, db) => {
  let prog = message.guild.channels.cache.filter((c) => c.name === "priv-prognosticator").map((x) => x.id)
  let nightCount = db.get(`nightCount`)
  let res = false
  for (let i = 0; i < prog.length; i++) {
    let peace = db.get(`peace_${prog[i]}`) || "none"
    if (peace !== "none" && peace === nightCount) res = true
  }
  return res
}

module.exports.dcActions = (message, db, alive) => {
    let tempchan
    let dc = message.guild.channels.cache.filter((c) => c.name === "priv-dreamcatcher").map((x) => x.id)
    for (let i = 0; i < dc.length; i++) {
        tempchan = dc[i]
    }
    let hypnotized = db.get(`hypnotized_${tempchan}`)
    let tempguy = message.guild.members.cache.find((m) => m.nickname === hypnotized)
    let role = message.guild.channels.cache.filter((c) => c.name === `priv-${db.get(`role_${tempguy.id}`).replace(" ", "-").toLowerCase()}`).map((x) => x.id)
    for (let b = 0; b < role.length; b++) {
        let chan = message.guild.channels.cache.get(role[b])
        if (chan.permissionsFor(tempguy).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
            if (tempguy.roles.cache.has(alive.id)) {
                return {
                    tempguy,
                    chan,
                    tempchan
                }
            }
        }
    } 
}

module.exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.randomWeight = (options) => { 
  var i; 
  var weights = []; 
  for (i = 0; i < options.length; i++) {
    weights[i] = parseInt(Object.values(options[i])) + (weights[i - 1] || 0); 
  }
  
  var random = Math.random() * weights[weights.length - 1]; 
  for (i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      break; 
    }
  }
  return Object.keys(options[i])[0] 
}
