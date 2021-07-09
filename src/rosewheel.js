/*

This file holds the prizes for the rose wheel.
Name: the name shown to the user
Rate: higher rate = more common
ID: One of "coin", "rose", "bouquet", "lootbox", "other"
Amount: amount of prize to give


*/

module.exports = [
  { name: "100 Coins", rate: 1, item: "coin", amount: 100 },
  { name: "100 Coins", rate: 1, item: "coin", amount: 100 },
  { name: "250 Coins", rate: 1, item: "coin", amount: 250 },
  { name: "250 Coins", rate: 1, item: "coin", amount: 250 },
  { name: "500 Coins", rate: 1, item: "coin", amount: 500 },
  { name: "Lootbox", rate: 1, item: "lootbox", amount: 1 },
  { name: "5 Roses", rate: 1, item: "rose", amount: 5 },
  { name: "Icon", rate: 1, item: "other", amount: 1 },
]
