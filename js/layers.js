addLayer("p", {
    name: "Paleolithic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F6E4AD",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Paleolithic Points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for paleolithic points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
upgrades:{
11:{ 
title:"Stone tools",
description:"2x Points",
cost: new Decimal(1),
},
12:{ 
title:"Bone tools",
description: "Are bone tools effective!?, Paleolithic Points Boost Points",
cost: new Decimal(5),
effect() {
return player[this.layer].points.add(1).pow(0.35)
            },
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
13: {
title:"Advanced Bone tools",
description: "Are They Really Really Effective, Points Boost Paleolithic Points",
cost: new Decimal(25),
effect() {
return player.points.add(1).pow(0.20)
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
},
},
})