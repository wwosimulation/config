/*

This file holds all the information for the shop.
Formats are given above each section.

*/

const emojis = require("./emojis.js")
const { MessageEmbed } = require("discord.js")
module.exports = {
  pages: [],
} // This initalizes the shop

/*

Format:
{ id: "uniqueid", name: "Item Name", price: 100, currency: "roses", description: "Description Here", role: "102937912392173597"},

The ID is what will be checked when doing +buy.
Generally this should be the first word of the name, in all lowercase
The currency can be either "gems", "roses", or "coins"
The role is the role given when the item is bought, delete that part if it doesn't give a role

*/
module.exports.items = [
  { id: "roses", name: "Rose", price: 25, currency: "coins", description: "Buy these to send someone a rose" },
  { id: "bouquet", name: "Rose Bouquet", price: 250, currency: "coins", description: "Use these to give everyone in the game a rose, including yourself!" },
  { id: "profile", name: "Profile Command", price: 200, currency: "coins", description: "Gain the ability to use `+profile`" },
  { id: "dj", name: "DJ Role", price: 300, currency: "coins", description: "Gain the ability to use the music bots both here and in a game!", role: "606123674562723840" },
  { id: "icon", name: "Icon", price: 20, currency: "roses", description: "Add an icon to your profile!" },
  { id: "description", name: "Description", price: 1, currency: "gems", description: "Customize your profile description!" },
  { id: "immunity", name: "Immunity", price: 10, currency: "roses", description: "When spectating, I will not change your name to lazy spectator", role: "691390867822477413" },
  { id: "gamegifs", name: "Game GIFs", price: 10, currency: "roses", description: "When playing a game, you can now send GIFs from the /tenor command", role: "897895751965876335" },
  { id: "color", name: "Color Role", price: 50, currency: "coins", description: "See all the available colors by using `+shop colors`" },
  { id: "special", name: "Special Color Role", price: 100, currency: "coins", description: "Get your own color role!" },
  { id: "grey", name: "Grey Color Role", price: 200, currency: "coins", description: "Gain the very rare Grey Color role", role: "606123657210757136" },
  { id: "ranked", name: "Ranked Pass", price: 250, currency: "coins", description: "Gain access to play ranked games!", role: "832845602009645116" },
  { id: "emoji", name: "Emoji", price: 450, currency: "coins", description: "Gain access to the `+emoji` and `+emojilist` commands", role: "663389088354664477" },
   //{ id: "cmi", name: "Custom Maker Item", price: 1000, currency: "coins", description: "You can use this to create your own role list when playing.\nThis does not give you the full set of role list. You need to buy the rest of the roles using coins or roses. To check the list, do `+cmi`!" },
  { id: "channel", name: "Private Channel", price: 100, currency: "roses", description: "Create your own private channel in this server!", role: "627539599862005760" },
  { id: "normal", name: "Normal Item Roulette", price: 0, currency: "coins", description: "Gain access to the item roulette channels to get color roles", role: "606123668162084894", response: "You now have access to the item roulette channels! Use ,ir to use the roulette." },
  { id: "premium", name: "Premium Item Roulette", price: 25, currency: "coins", description: "Gives an higher chance on getting rare roles in item roulette", role: "606123666895274003", response: "You now have an higher chance on rare items in item roulette! Use ,pir to use the elite roulette." },
  { id: "elite", name: "Elite Item Roulette", price: 50, currency: "coins", description: "Gives the highest chance on getting rare roles in item roulette", role: "606123666257870868", response: "You now have the highest chance on rare items in item roulette! Use ,eir to use the elite roulette." }
]

/*

This is for all the colors available for purchase
Format:
{ name: "Name in Shop", id: "roleidhere"},

*/
module.exports.colors = [
  { name: "Blue", id: "606123652861394965" },
  { name: "Yellow", id: "606123653469569084" },
  { name: "Turquoise", id: "606123656535474187" },
  { name: "Red", id: "606123651900899345" },
  { name: "Crimson", id: "606123658016063507" },
  { name: "Black", id: "606123654438453269" },
  { name: "Pink", id: "606123655289634826" },
  { name: "Green", id: "606123654106841088" },
  { name: "Orange", id: "606123655931494411" },
]

/*

This is for all the icons available for purchase
Format:
{ name: "Name in Shop", image: "Image link here", id: "uniqueid", price: 0},

*/
module.exports.icons = [{ name: "Werewolf Berserk Redraw\nCredit to u/Tom_qx", image: "https://media.discordapp.net/attachments/833432936714862682/833433091480485938/berserkdraw.png", id: "wwberserk", price: 10 }]

let embeds = [new MessageEmbed()]
let addFooter = false

for (let shopitem in module.exports.items) {
  let item = module.exports.items[shopitem]
  if (embeds[embeds.length - 1].fields.length == 5) embeds.push(new MessageEmbed())
  embeds[embeds.length - 1].addField(`${item.name} - ${item.price} ${emojis[item.currency]}`, item.description)
}
for (let [i, embed] of embeds.entries()) {
  embed.setFooter(`Page ${i + 1}/${embeds.length}`)
  embed.setTitle("Wolvesville Simulation Store").setColor("#1FFF43")
}

module.exports.embeds = embeds
