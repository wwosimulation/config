const players = require("../../schemas/players")

const teamMultipliers = {
  village: 3,
  werewolf: 4,
  couple: 5,
  sect: 5,
  zombie: 5,
  bandit: 5,
  modded: 5,
  solovoting: 6,
  solokiller: 6,
  evil: 5,
  tie: 2,
}

module.exports = { teamMultipliers }

module.exports.streakXP = (streak) => {
  streak = parseInt(streak)
  if (!streak) throw new Error(`${streak} is not a valid number`)
  if (streak == 2) return 10
  if (streak == 3) return 20
  if (streak == 4) return 40
  if (streak == 5) return 70
  if (streak >= 6) return 100
}

module.exports.fwotd = 80

module.exports.win = (playerCount, team) => {
  playerCount = parseInt(playerCount)
  if (!playerCount) throw new Error(`${playerCount} is not a valid player count`)
  let val = 4 * playerCount * teamMultipliers[team]
  return val
}

module.exports.lose = (playerCount) => {
  playerCount = parseInt(playerCount)
  if (!playerCount) throw new Error(`${playerCount} is not a valid player count`)
  let val = 4 * playerCount
  return val
}

module.exports.tie = (playerCount) => {
  playerCount = parseInt(playerCount)
  if (!playerCount) throw new Error(`${playerCount} is not a valid player count`)
  return 4 * playerCount * 2
}


async function level(playerUser, xpToAdd, xpEmbed, channel) {
  let embeds = [xpEmbed]
  let playerObject = await players.findOne({user: playerUser.id})
  await playerObject.update({$inc:{xp:xpToAdd}})
  playerObject = await players.findOne({user: playerUser.id})
  if(checkLevelUp(playerObject.level, playerObject.xp)) {
    let update = {$inc:{"level": 1, "inventory.lootbox": 1}}
    if(playerObject.level + 1 % 5 == 0) update.$inc["coins"] = 100
    await playerObject.update(update)
    embeds.push({
      "title": `🎉 LEVEL UP! 🎉`,
      "description": `Congrats! You are now level ${playerObject.level}!\n\nRewards:\n- 1 lootbox \n${playerObject.level % 5 == 0 ? "- 100 coins" : ""}`,
      "color": 0x008800,
      "thumbnail": {
        "url": playerUser.avatarURL(),
      }
    })
  }
  playerUser.send({embeds}).catch(e => {
    channels.cache.get("892046258737385473")?.send({ embeds, content: `<@${playerUser.id}>, I couldn't DM you!` })
  })
}

/** 
 * @param {integer} currentLevel
 * @param {integer} currentXp
 */
function checkLevelUp(currentLevel, currentXp) {
  var levelXP = 0
  for(let i = 0; i <= currentLevel; i++) {
    levelXP += 500+250*i
  }
  if(levelXP > currentXp) return false
  return true
}

module.exports.level = level

/*
Proposed new xp system
Game Result
Winning: 4 x (Number of players) x (Team Multiplier) xp
Losing: 4 x (Number of players) xp
Team Multiplier
Village: 3
Werewolves: 4
Couple/Sect/Zombie/Bandits: 5
Solo Voting: 6
Solo Killer: 7
Streak
2 games in a row - 10 xp
3 games - 20 xp
4 games - 40 xp
5 games - 70 xp
6 games - 100 xp (and so on)
Miscellaneous
First win of the Day: 80 xp
Quests
Easy: 40 xp
Medium: 80 xp
Hard: 120 xp
Special: Varies
Mega: Varies (Usually 200/120/60)
*/
