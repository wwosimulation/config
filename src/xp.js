/*

This file holds all the values for XP given after a game

Format:

"id": number,

The ID is given by Shadow

*/

// XP values for non-teams
module.exports = {
  finishGame: 15,
  winStreak: 25,
  firstWinOfTheDay: 100,
  narrator: 0,
}

// XP Values for each team
module.exports.team = {
  couple: 95,
  werewolf: 75,
  village: 55,
  fool: 150,
  headhunter: 150,
  solo: 175,
  tie: 15,
}
