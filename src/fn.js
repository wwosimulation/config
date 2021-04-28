/*

This file has helper functions for the bot
Nothing in this file should be adjusted

*/



const { GuildMember } = require("discord.js")
const ids = require("./ids.js")

module.exports = {
  isBeta: (id) => {
    return ["801726595378315264", "719564153072910407", "406412325973786624", "439223656200273932", "159717599993790464", "452632560795648000"].includes(id) ? true : false
  },
}

module.exports.isNarrator = (user) => {
  if (!user instanceof GuildMember) return
  let narroles = [ids.mini, ids.minisim, ids.narrator, ids.narratorsim]
  let isNarr = user.roles.cache.filter((x) => narroles.includes(x.id))
  if (isNarr.map((x) => x.id).length > 0) return true
  return false
}

module.exports.updateXP = (id, client) => {
  let guy = client.users.cache.get(id)
  let xp = client.db.get(`xp_${id}`) || 0
  let level = client.db.get(`level_${guy.id}`)
  let req = module.exports.nextLevel(level)
  if(xp > req) {
      client.db.add(`lootbox_${guy.id}`, 1)
      client.db.add(`level_${guy.id}`, 1)
      guy.send(`Congrats! You have reached Level ${client.db.get(`level_${guy.id}`)}!\n\nYou have recieved a lootbox. To open it, do \`+use lootbox\`.`)
      module.exports.updateXP(id, client)
  }

    
}

module.exports.nextLevel = (level = 0) => {
  return 500 + (500 * (0.5 * level))
}
