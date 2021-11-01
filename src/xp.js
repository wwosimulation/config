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
