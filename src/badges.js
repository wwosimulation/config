/*

In this file we will store all needed information for each badge. So those can be used in a badge help.
Format:

{
    name: String,           # Name with caps (e.g. Pro Player (gold))
    value: String,          # DBName (e.g. pro_player_gold)
    description: String,    # Description what the badge is given for
    requirement: String     # Requirement (e.g. Win 100 games)
}

*/

const badges = [
    {
        name: "Staff",
        value: "staff",
        description: "This badge is given to all Staff members. You don't get any gems for this badge.",
        requirement: "Be part of the Staff team."
    }, {
        name: "Suggestor",
        value: "suggestor",
        description: "We keep adding features to the bot. Everyone who helps us improving it gets this badge as small thank you.",
        requirement: "Suggest 5 new features."
    }, {
        name: "Item Roulette Master",
        value: "item_roulette_master",
        description: "Keep spinning the item roulette and try to get all roles you can win!",
        requirement: "Get all roles from the item roulette."
    }, {
        name: "Active Player (Bronze)",
        value: "active_player_bronze",
        description: "Keep playing games with us! We want to thank everyone who is actively playing our sim games.",
        requirement: "Play 25 games."
    }, {
        name: "Active Player (Silver)",
        value: "active_player_silver",
        description: "Keep playing games with us! We want to thank everyone who is actively playing our sim games.",
        requirement: "Play 50 games."
    }, {
        name: "Active Player (Gold)",
        value: "active_player_gold",
        description: "Keep playing games with us! We want to thank everyone who is actively playing our sim games.",
        requirement: "Play 100 games."
    }, {
        name: "Pro Player (Bronze)",
        value: "pro_player_bronze",
        description: "Getting better and better. You are not only active but also successful.",
        requirement: "Win 25 games."
    }, {
        name: "Pro Player (Silver)",
        value: "pro_player_silver",
        description: "Getting better and better. You are not only active but also successful.",
        requirement: "Win 50 games."
    }, {
        name: "Pro Player (Gold)",
        value: "pro_player_gold",
        description: "Getting better and better. You are not only active but also successful.",
        requirement: "Win 100 games."
    }, {
        name: "Interaction Tester",
        value: "interaction_tester",
        description: "From time to time we need to test interactions in the app. As we normally need more people, you can help us out and get this badge.",
        requirement: "Be part in 5 interaction tests."
    }, {
        name: "Beta Tester",
        value: "beta_tester",
        description: "Thank you to all beta testers who helped us testing and debugging the bot. Currently we don't need anymore beta testers. Maybe in the future!",
        requirement: "Be part of the beta testers."
    }, {
        name: "10k XP",
        value: "10k_xp",
        description: "Play games to gain more XP. Eventually you will get this badge once you reached 10k XP.",
        requirement: "Reach 10k XP"
    },
]

/**
 * @param {String} searchString 
 */
function badgesFilter(searchString) {
    const results = []
    badges.forEach((badge) => {
        let copyQ = searchString.toLowerCase()
        let copyB = { ...badge }
        copyQ.replace(/ /g, "")
        copyB.name.toLowerCase().replace(/ /g, "")
        copyB.value.toLowerCase().replace(/ /g, "")
        if (copyB.name.includes(copyQ) || copyB.value.includes(copyQ)) results.push(badge)
    })
    return results
}

const embeds = badges.map((badge) => {
    return {
        title: "Badges - " + badge.name,
        description: `**Name:** ${badge.name}\n**Description:** ${badge.description}\n**Requirement:** ${badge.requirement}`,
        color: 7608756
    }
})

/**
 * @param {Object} badgeObject 
 */
function getEmbedIndex(badgeObject = badges[0]) {
    return badges.findIndex(badge => badgeObject == badge) 
}

module.exports.badges = badges
module.exports.badgesFilter = badgesFilter
module.exports.badgesEmbeds = embeds
module.exports.getEmbedIndex = getEmbedIndex