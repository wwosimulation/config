/*
This file has functions to generate role info for the bot
Nothing in this file should be adjusted without a developer's assistance
*/

const { Collection } = require("discord.js")
const descriptions = require("./descriptions.js")
const icons = require("./icons.js")
const defaultRole = {
  name: "Error! Please inform the developers about this!",
  icon: "https://cdn.discordapp.com/emojis/424929422190182422.png",
  aura: "Unknown",
  team: "Solo",
  soloKiller: false,
  description: "No description found",
}

module.exports = {
  allRoles: [],
  roles: new Collection(),
}

const addRoleProperty = (rolename, property, value) => {
  let role = module.exports.roles.get(rolename)
  if (!role) {
    role = Object.assign({}, defaultRole)
    module.exports.allRoles.push(rolename)
    role.name = rolename
  }
  role[property] = value
  module.exports.roles.set(rolename, role)
}

// Not up to date. Teams are now added in line 59
let teams = {
  Village: ["Villager", "Doctor", "Bodyguard", "Tough Guy", "Red Lady", "Gunner", "Jailer", "Priest", "Marksman", "Seer", "Aura Seer", "Spirit Seer", "Seer Apprentice", "Detective", "Medium", "Mayor", "Witch", "Avenger", "Beast Hunter", "Pacifist", "Grumpy Grandma", "Cupid", "President", "Cursed", "Loudmouth", "Flower Child", "Sheriff", "Fortune Teller", "Forger", "Grave Robber", "Santa Claus", "Easter Bunny", "Sibling", "Drunk", "Mad Scientist", "Idiot", "Wise Man", "Doppelganger", "Naughty Boy", "Handsome Prince", "Sect Hunter", "Mortician", "Prognosticator", "Pumpkin King", "Baker", "Vigilante", "Ritualist", "Trapper", "Instigator", "Analyst", "Night Watchman", "Warden", "Preacher", "Ghost Lady", "Undertaker"],
  Werewolf: ["Werewolf", "Junior Werewolf", "Wolf Pacifist", "Shadow Wolf", "Wolf Seer", "Kitten Wolf", "Wolf Shaman", "Alpha Werewolf", "Werewolf Berserk", "Nightmare Werewolf", "Guardian Wolf", "Kitten Wolf", "Sorcerer", "Lone Wolf", "Astral Wolf", "Werewolf Fan", "Voodoo Werewolf", "Stubborn Wolf", "Split Wolf", "Wolf Trickster"],
  Zombie: ["Zombie"],
  Sect: ["Sect Leader", "Sect Member"],
  Bandit: ["Bandit", "Accomplice"],
  Instigator: ["Instigator"],
}


for (let desc in descriptions) {
  let name = desc.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
  addRoleProperty(name, "description", descriptions[desc])
  addRoleProperty(name, "icon", icons[desc])
}

module.exports.roles.each((role) => {
  // Add aura
  if((role.name.toLowerCase().includes("wolf") || role.name === "Sorcerer") && !["Alpha Werewolf", "Stubborn Werewolf", "Werewolf Fan"].includes(role.name)) {
    addRoleProperty(role.name, "aura", "Evil")
  } else if(role.description.includes("**Good**")) {
    addRoleProperty(role.name, "aura", "Good")
  }

  // Add team
  let roleTeam = role.description.match(/\*\*[A-Za-z]{1,15}\*\*/g)
  if (roleTeam?.length === 2) {
    roleTeam = roleTeam[1].replace(/\*/g, "").replace("Werewolves", "Werewolf")
    addRoleProperty(role.name, "team", roleTeam)
  }
  
})

for (let team in teams) {
  teams[team].forEach((role) => {
    addRoleProperty(role, "team", team)
  })
}

let soloKillers = ["Serial Killer", "Arsonist", "Bomber", "Corruptor", "Cannibal", "Illusionist", "Bandit", "Alchemist", "Hacker", "Dreamcatcher", "Jack", "Evil Detective"]
soloKillers.forEach((role) => {
  addRoleProperty(role, "soloKiller", true)
})

module.exports.roles.forEach((role) => {
  module.exports.allRoles.push(role.name)
})
