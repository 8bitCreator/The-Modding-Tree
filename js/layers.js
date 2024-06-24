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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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
            effectDescription: "Prestiges boost points",
            done() { return player.p.points.gte(25) },
            unlocked() { return hasMilestone('p', 2)},
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
        }
    }
        
    }
})
