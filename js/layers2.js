addLayer("l", {
    name: "Flow Stated Poins", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#483D8B",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "Flow Points", // Name of prestige currency
    baseResource: "Concentrated Points", // Name of resource prestige is based on
    baseAmount() {return player.c.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from 
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "L", description: "l: Reset for Flow points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('f', 1)},
upgrades:{
11:{         
title: "C1",
description: "Flow Points boost Condensated Points.",
cost: new Decimal(1),
effect(){
 return player[this.layer].points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
},
})