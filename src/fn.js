/*

This file has helper functions for the bot
Nothing in this file should be adjusted

*/

const { Collection } = require("discord.js")
const ids = require("./ids.js")

let a = new Collection()

module.exports = {
  isBeta: (id) => {
    return ["801726595378315264", "719564153072910407", "406412325973786624", "439223656200273932", "159717599993790464", "452632560795648000", "517335997172809728"].includes(id) ? true : false
  },
}

module.exports.isNarrator = (user) => {
  return user.client.guilds.resolve(ids.server.sim).members.resolve(user.id).roles.cache.hasAny(ids.minisim, ids.narratorsim)
}
module.exports.isStaff = (user) => {
  let member = user.client.guilds.cache.get(ids.server.sim).members.cache.get(user.id)
  if (member.roles.cache.hasAny(ids.staff, ids.afkstaff)) return true
  return false
}

module.exports.isDev = (user) => {
  let member = user.client.guilds.resolve(ids.server.sim).members.resolve(user.id)
  if(member.roles.cache.hasAny(ids.devAss, ids.botDev)) return true
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
  input = input.replace(/([<@!>])+/g, "")
  let target = message.guild.members.cache.get(input)
  if (!target) target = message.guild.members.cache.find((member) => member.user.tag === input || member.user.id === input || member.user.username === input || (member.nickname !== null && member.nickname === input))
  if (!target) target = message.guild.members.cache.find((member) => member.user.username.toLowerCase() + "#" + member.user.discriminator === input.toLowerCase() || member.user.username.toLowerCase() === input.toLowerCase() || (member.nickname !== null && member.nickname.toLowerCase() === input.toLowerCase()))
  if (!target) target = message.guild.members.cache.find((member) => member.user.username.startsWith(input) || member.user.username.toLowerCase().startsWith(input.toLowerCase()))
  if (!target) target = message.guild.members.cache.find((member) => (member.nickname !== null && member.nickname.startsWith(input)) || (member.nickname !== null && member.nickname.toLowerCase().startsWith(input.toLowerCase())))
  if (!target) target = message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(input.toLowerCase()) || (member.nickname !== null && member.nickname.toLowerCase().includes(input.toLowerCase())))
  return target
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

module.exports.getEmoji = (name, client) => {
  if (!a.get("client")) {
    if (!client) return "❌"
    if (typeof client !== "object") {
      if (typeof name !== "object") return "❌"
      a.set("client", name)
      name = client
      client = a.get("client")
    } else {
      a.set("client", client)
      client = a.get("client")
    }
  }
  if (typeof name === "object" && typeof client === "object") return "❌"
  if (typeof name === "object") name = client
  if (!client) client = a.get("client")
  
  return client.emojis.cache.find(emoji => emoji.name.toLowerCase() == name.toLowerCase() && emoji.available) ?? client.emojis.cache.find(emoji => emoji.name.toLowerCase() == "error")
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

module.exports.teammateCheck = ({ player: executioner, target: guy, db }) => {
  if (!executioner || !guy) return "❌"
  if (!db && !a.get("db")) "❌"
  if (!db) db = a.get("db")
  let player = db.get(`player_${executioner}`)
  let target = db.get(`player_${guy}`)
  let { cupid: cupid1, instigator: instigator1 } = player
  let { cupid: cupid2, instigator: instigator2 } = target
  if (!a.get("db")) a.set("db", db)
  
  let isCouple = (cupid1?.filter(a => cupid2.includes(a)).length > 0 ? true : false) || (player.couple === target.id)
  let isRecruit = instigator1?.filter(a => instigator2.includes(a)).length > 0 ? true : false
  let isInstigator = instigator1 === guy ? true : false
  
  let result = {
    couple: isCouple,
    recruit: isRecruit,
    instigator: isInstigator
  }
  
  return result
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

module.exports.disableButtons = (message) => {
  message.components.forEach(comp => {
    let btns = comp.components
    btns.forEach((x) => {
      x.setDisabled(true)
    })
  })

  let sendData = {}
  if (message.content) sendData.content = message.content
  if (message.embeds) sendData.embeds = message.embeds
  if (message.components) sendData.components = message.components
  return sendData
}
