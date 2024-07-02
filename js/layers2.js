addLayer("f", {
    name: "Fire", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF4500",
    resource: "Fire", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
 if (hasUpgrade('f', 11)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "F: Reset for fire points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('p', 15)},
    branches:[["p", 0]], 
update(diff) {
player.f.points = player.f.points.add(mult.times(diff))},
upgrades:{
11:{
title: "Spark Mastery!?",
description: "2x Fire",
cost: new Decimal(10),
},
12:{
title: "Fire is the new paleolithic innovation!",
description:"Fire Boosts paleolithic points by a tiny amount",
cost: new Decimal(50),
effect(){
 let f12 = player.f.points.add(1).max(1)
f12 = Decimal.log5(f12).add(1).max(1)
return f12
},
effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
},
},
})