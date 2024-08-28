addLayer("b", {
    name: "Big Bang", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#1D1E33",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Singularity Points", // Name of prestige currency
    baseResource: "matter", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	if (hasUpgrade("b", 13)) {
        mult = mult.mul(upgradeEffect("b", 13)); } 
	if (hasUpgrade("b", 22)) {
        mult = mult.mul(upgradeEffect("b", 22)); }
	if (hasUpgrade("b", 22)) {
        mult = mult.mul(upgradeEffect("b", 23)); }      
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
    upgrades: {
    11: {
        title: "Universal Beginning",
        description: "Boosts Matter generation by ",
        cost: new Decimal(1),
        eeffect() { 
            let eff = new Decimal(2); // Base effect is 2
            if (hasUpgrade("b", 31)) { // Check if Upgrade 31 has been purchased
                eff = eff.pow(upgradeEffect("b", 31)); // Raise the effect to the power of Upgrade 31's effect
            }
            return eff; 
        effectDisplay() { return format(this.effect()) + "x"; }, // Displays the effect
    },
    12: {
        title: "Quantum Fluctuation",
        description: "Boosts Matter generation based on current Singularity points By",
        cost: new Decimal(3),
        effect() {
		let eff = player.b.points.add(1).pow(0.3);
            if (hasUpgrade("b", 32)) { // Check if Upgrade 31 has been purchased
                eff = eff.pow(upgradeEffect("b", 32)); // Raise the effect to the power of Upgrade 31's effect
            }
            return eff; 
        },
        effectDisplay() { return format(this.effect()) + "x"; },
	 unlocked() { return hasUpgrade("b", 11); },
    },
     13: {
            title: "Singularity Expansion",
            description: "Boosts Singularity Points generation based on current Singularity Points by",
            cost: new Decimal(5), // Set the cost of this upgrade
            effect() {
                let eff = player.b.points.add(1).pow(0.1); // This will provide a boost based on the current Singularity Points
            if (hasUpgrade("b", 33)) { // Check if Upgrade 31 has been purchased
                eff = eff.pow(upgradeEffect("b", 33)); // Raise the effect to the power of Upgrade 31's effect
            }
            return eff; 
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 12); }, // Only unlock if Upgrade 12 has been purchased
        },
	       21: {
        title: "Matter Amplification",
        description: "Boosts Matter generation based on current Matter by",
        cost: new Decimal(10),
        effect() {
            let eff = player.points.add(1).pow(0.1);
            return eff;
        },
        effectDisplay() { return format(this.effect()) + "x"; },
        unlocked() { return hasUpgrade("b", 13); },
    },
	    22: {
    title: "Matter to Singularity",
    description: "Matter boosts Singularity Points generation by",
    cost: new Decimal(25), // Define the cost for this upgrade
    effect() {
        let eff = player.points.add(1).log10().pow(0.6); // Using 0.6 as the power
        return eff;
    },
    effectDisplay() { return format(this.effect()) + "x"; },
    unlocked() { return hasUpgrade("b", 21); }, // This upgrade is unlocked after purchasing Upgrade 21
},
23: {
    title: "Cosmic Expansion", 
    description: "Boosts Singularity Points generation by",
    cost: new Decimal(50), // Cost for this upgrade
    effect() {
        let eff = new Decimal(2); // Corrected the creation of the Decimal object
        return eff; // Returns the effect value
    },
    effectDisplay() { return format(this.effect()) + "x"; }, // Displays the effect
    unlocked() { return hasUpgrade("b", 22); }, // Unlocked after purchasing Upgrade 22
},
31: {
        title: "Upgrade Mastery",
        description: "Shows amount of Upgrade bought in this layer and boost first upgrade by",
        cost: new Decimal(100), // Define the cost for this upgrade
        effect() {
            let eff = player.v.upgrades.length; // Counts the number of upgrades purchased
            return eff; // Returns the effect value
        },
        effectDisplay() { 
            return "^" + format(this.effect()); // Displays the power effect using its own effect() value
        },
        unlocked() { return hasUpgrade("b", 23); }, // Unlocked after purchasing Upgrade 23
    },
32: {
    title: "Upgrade Mastery Pt2",
    description: "Make Upgrade Mastery boost Quantum Fluctuation with a reduced effect.",
    cost: new Decimal(150), // Define the cost for this upgrade
    effect() {
        let eff = upgradeEffect("b", 31).pow(0.5); // Apply the square root to the effect of Upgrade 31
        return eff; // Returns the effect value
    },
   effectDisplay() { 
            return "^" + format(this.effect()); // Displays the power effect using its own effect() value
        },
    unlocked() { return hasUpgrade("b", 31); }, // Unlocked after purchasing Upgrade 31
},
33: {
        title: "Upgrade Mastery Pt3",
        description: "Make Upgrade Mastery boost Quantum Fluctuation with a stronger reduced effect",
        cost: new Decimal(150), // Define the cost for this upgrade
	 effect() {
        let eff = upgradeEffect("b", 31).pow(0.25); // Apply the square root to the effect of Upgrade 31
        return eff; // Returns the effect value
    },
	effectDisplay() { 
            return "^" + format(this.effect()); // Displays the power effect using its own effect() value
        },
        unlocked() { return hasUpgrade("b", 32); }, // Unlocked after purchasing Upgrade 23
    },
}
})
