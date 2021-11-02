/*

This file holds the prizes for the rose wheel.
Name: the name shown to the user
Rate: higher rate = more common
ID: One of "coin", "rose", "bouquet", "lootbox", "other"
Amount: amount of prize to give


*/

module.exports = [
  { name: "100 Coins", rate: 1, item: "coins", amount: 100 },
  { name: "100 Coins", rate: 1, item: "coins", amount: 100 },
  { name: "500 Coins", rate: 1, item: "coins", amount: 500 },
  { name: "250 Coins", rate: 1, item: "coins", amount: 250 },
  { name: "250 Coins", rate: 1, item: "coins", amount: 250 },
  { name: "1 Lootbox", rate: 1, item: "inventory.lootbox", amount: 1 },
  { name: "5 Roses", rate: 1, item: "inventory.rose", amount: 5 },
  { name: "1 Gem", rate: 1, item: "gems", amount: 1 }, // used to be { name: "Icon", rate: 1, item: "other", amount: 1 }
]
