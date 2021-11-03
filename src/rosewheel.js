/*

This file holds the prizes for the rose wheel.
Name: the name shown to the user
Rate: higher rate = more common
Item: location of the data to be updated
Amount: amount of prize to give
Icon: Icon of the prize (https://www.wolvesville.com/static/media/ + {icon} + .png)

*/

module.exports = [
  { name: "100 Coins", rate: 2, item: "coins", amount: 100, icon: "gold_pile_2.f6035285" },
  { name: "250 Coins", rate: 2, item: "coins", amount: 250, icon: "gold_pile_3.32199ad2" },
  { name: "500 Coins", rate: 1, item: "coins", amount: 500, icon: "gold_pile_5.59503148" },
  { name: "1 Lootbox", rate: 1, item: "inventory.lootbox", amount: 1, icon: "loot_box_icon.c8726777" },
  { name: "1 Gem", rate: 1, item: "gems", amount: 1, icon: "gem.439d7650" }, // used to be { name: "Icon", rate: 1, item: "other", amount: 1 }
  { name: "5 Roses", rate: 1, item: "inventory.rose", amount: 5, icon: "rose_inventory_single.eb6af861" },
]
