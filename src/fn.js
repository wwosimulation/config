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
module.exports.isStaff = (user) => {
  if(!user.guild) throw new Error("Please pass a guildmember")
  let member = user.client.guilds.cache.get(ids.server.sim).members.cache.get(user.id)
  if(member.roles.cache.has(ids.staff) || member.roles.cache.has(ids.afkstaff)) return true
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

module.exports.getUser = (input, message) => {
  if (!input) return message.member;
  let target = message.mentions.members.first();
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.tag === input ||
        member.user.id === input ||
        member.user.username === input ||
        (member.nickname !== null && member.nickname === input)
    );
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.username.toLowerCase() +
          "#" +
          member.user.discriminator ===
          input.toLowerCase() ||
        member.user.username.toLowerCase() === input.toLowerCase() ||
        (member.nickname !== null &&
          member.nickname.toLowerCase() === input.toLowerCase())
    );
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.username.startsWith(input) ||
        member.user.username.toLowerCase().startsWith(input.toLowerCase())
    );
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        (member.nickname !== null && member.nickname.startsWith(input)) ||
        (member.nickname !== null &&
          member.nickname.toLowerCase().startsWith(input.toLowerCase()))
    );
  }
  if (target == null) {
    target = message.guild.members.cache.find(
      (member) =>
        member.user.username.toLowerCase().includes(input.toLowerCase()) ||
        (member.nickname !== null &&
          member.nickname.toLowerCase().includes(input.toLowerCase()))
    );
  }
  return target;
}

module.exports.sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}