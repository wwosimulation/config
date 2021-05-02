/*

This file holds all the information for the shop.
Formats are given above each section.

*/

module.exports = {} // This initalizes the shop


/*

Format:
{ id: "uniqueid", name: "Item Name", price: 100, currency: "rose", description: "Description Here", role: "102937912392173597"},

The ID is what will be checked when doing +buy.
Generally this should be the first word of the name, in all lowercase
The currency can be either "gem", "rose", or "coin"
The role is the role given when the item is bought, delete that part if it doesn't give a role

*/
module.exports.items = [
  { id: "color", name: "Color Role", price: 50, currency: "coin", description: "See all the available colors by using `+shop colors`" },
  { id: "special", name: "Special Color Role", price: 100, currency: "coin", description: "Get your own color role!" },
  { id: "dj", name: "DJ Role", price: 300, currency: "coin", description: "Gain the ability to use the music bots both here and in a game!", role: "606123674562723840" },
  { id: "immunity", name: "Immunity", price: 10, currency: "rose", description: "When spectating, I will not change your name to lazy spectator", role: "691390867822477413" },
  { id: "profile", name: "Profile Command", price: 200, currency: "coin", description: "Gain the ability to use +profile" },
  { id: "ranked", name: "Ranked Pass", price: 250, currency: "coin", description: "Gain access to play ranked games!", role: "832845602009645116" },
  { id: "emoji", name: "Emoji", price: 450, currency: "coin", description: "Gain access to the `+emoji` and `+emojilist` commands", role: "663389088354664477" },
  { id: "rose", name: "Rose", price: 25, currency: "coin", description: "Buy these to send someone a rose" },
  { id: "bouquet", name: "Rose Bouquet", price: 250, currency: "coin", description: "Use these to give everyone in the game a rose, including yourself!" },
  { id: "grey", name: "Grey Color Role", price: 200, currency: "coin", description: "Gain the very rare Grey Color role", role: "606123657210757136" },
  { id: "cmi", name: "Custom Maker Item", price: 1500, currency: "coin", description: "You can use this to create your own role list when playing.\nThis does not give you the full set of role list. You need to buy the rest of the roles using coins or roses. To check the list, do `+cmi`!" },
  { id: "channel", name: "Private Channel", price: 100, currency: "rose", description: "Create your own private channel in this server!", role: "627539599862005760" },
  { id: "icon", name: "Icon", price: 20, currency: "rose", description: "Add an icon to your profile!" },
  { id: "description", name: "Description", price: 25, currency: "rose", description: "Customize your profile description!" },
  { id: "normal", name: "Item roulette", price: 0, currency: "coin", description: "Gain access to the item roulette channels to get color roles", role: "606123668162084894", response: "You now have access to the item roulette channels! Use ?ir to use the roulette." },
  { id: "premium", name: "Premium item roulette", price: 25, currency: "coin", description: "Gives an higher chance on getting rare roles in item roulette", role: "606123666895274003", response: "You now have an higher chance on rare items in item roulette! Use ?pir to use the elite roulette." },
  { id: "elite", name: "Elite item roulette", price: 50, currency: "coin", description: "Gives the highest chance on getting rare roles in item roulette", role: "606123666257870868", response: "You now have the highest chance on rare items in item roulette! Use ?eir to use the elite roulette." },

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
  { name: "Salmon", id: "606123655931494411" },
]

