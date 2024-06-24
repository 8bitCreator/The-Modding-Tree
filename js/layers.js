addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('p', 2)) mult = mult.times(2)
        if (hasUpgrade('p', 11)) mult = mult.times(10)   
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13)) 
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))                
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from 
        exp = new Decimal(1)
        if (hasMilestone('p', 4)) exp = exp.add(0.05)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    milestones: {
        0: {
            requirementDescription: "2 Prestiges points",
            effectDescription: "2x points!",
            done() { return player.p.points.gte(2) },
        },
        1: {
            requirementDescription: "5 Prestiges points",
            effectDescription: "3x points!",
            done() { return player.p.points.gte(5) },
            unlocked() { return hasMilestone('p', 0)},
        },
        2: {
            requirementDescription: "50 points",
            effectDescription: "2x Prestiges!",
            done() { return player.points.gte(50) },
            unlocked() { return hasMilestone('p', 1)},
        },
        3: {
            requirementDescription: "25 Prestiges",
            effectDescription: "Points ^1.2",
            done() { return player.p.points.gte(25) },
            unlocked() { return hasMilestone('p', 2)},
    },
    4: {
        requirementDescription: "150 Points",
        effectDescription: "Prestige ^1.05 + An Upgrade",
        done() { return player.points.gte(150) },
        unlocked() { return hasMilestone('p', 3)},
} 
    },
    upgrades: {
        11: {
            title: "10x Prestiges",
            description: "Read the Title",
            cost: new Decimal(25),
        unlocked(){ return hasMilestone('p', 4)},
        },
        12: {
            title: "V1",
            description: "Prestiges boost points.",
            cost: new Decimal(250),
            unlocked() { return hasUpgrade('p', 11)},
            effect() {
                return player[this.layer].points.add(1).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title: "V2",
            description: "Point boost Prestiges",
            cost: new Decimal(2500),
        unlocked(){ return hasUpgrade('p', 12)},
        effect() { if (hasUpgrade('c', 11)) 
            return player.points.add(1).pow(0.15).times(upgradeEffect('c', 11))
         else
         return player.points.add(1).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        14: {
            title: "V3",
            description: "Prestiges boost Prestiges",
            cost: new Decimal(5000),
        unlocked(){ return hasUpgrade('p', 13)},
        effect() { if (hasUpgrade('c', 11)) 
            return player.points.add(1).pow(0.15).times(upgradeEffect('c', 12))
         else
         return player.points.add(1).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        }, 
        15: {
            title: "V4",
            description: "Points boost Points + New layer",
            cost: new Decimal(5000),
        unlocked(){ return hasUpgrade('p', 14)},
        effect() { if (hasUpgrade('c', 11)) 
            return player.points.add(1).pow(0.15).times(upgradeEffect('c', 13))
         else
         return player.points.add(1).pow(0.15)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        }, 
    } 

}),
addLayer("c", {
    name: "Concentration", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CCCCFF",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Concentrated Points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)               
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from 
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "P: Reset for Concentrated points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('p', 15)},
    upgrades: {
        11: {
            title: "New layer!?",
            description: "Concentrated Points boost V2",
            cost: new Decimal(10),
        unlocked(){ return hasUpgrade('p', 15)},
        effect() {
            return player.c.points.add(1).pow(0.35)
        },
    },
    12: {
        title: "+V3",
        description: "Concentrated Points boost V3",
        cost: new Decimal(10),
    unlocked(){ return hasUpgrade('c', 11)},
    effect() {
        return player.c.points.add(1).pow(0.35)
    },
},
13: {
    title: "+V3",
    description: "Concentrated Points boost V3",
    cost: new Decimal(10),
unlocked(){ return hasUpgrade('c', 12)},
effect() {
    return player.c.points.add(1).pow(0.35)
},
}
}
})