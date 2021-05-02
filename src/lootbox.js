/*

This file holds the prizes for the lootbox.
Name: the name shown to the user
Rate: higher rate = more common
ID: One of "coin", "rose", "bouquet", "lootbox", "other"
Amount: amount of prize to give


*/

module.exports = [
    {name: "5 Coins", rate: 1, item: "coin", amount: 10},
    {name: "10 Coins", rate: 1, item: "coin", amount: 10},
    {name: "25 Coins", rate: 1, item: "coin", amount: 25},
    {name: "25 Coins", rate: 1, item: "coin", amount: 25},
    {name: "50 Coins", rate: 1, item: "coin", amount: 50},
    {name: "1 Rose", rate: 1, item: "rose", amount: 1},
    {name: "1 Rose Bouquet", rate: 1, item: "bouquet", amount: 1},
    {name: "Icon", rate: 1, item: "other", amount: 1},
]
