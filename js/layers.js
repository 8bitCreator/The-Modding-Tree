addLayer("r", { // 'r' for "Replicanti"
    name: "TimeShards",
    symbol: "R",
    position: 0, // Position within the tree
    startData() { return {
        unlocked: true, // This layer is unlocked at the start
        points: new Decimal(0), // The main currency, Replicanti
    }},
    color: "#800020", // Lime green color for Replicanti
    type: "none", // No standard prestige; full custom control
    row: 0, // First row on the tree
    hotkeys: [
        {key: "r", description: "R: Reset for Replicanti", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    resource: "Time Shards",
    layerShown(){return true}, // Show the Replicanti layer at all times

    // Replicanti Growth Formula (Update with Upgrade Effects)
    update(diff) {
        let growthRate = new Decimal(1); // Base 1% growth rate per second

        // Apply upgrade effects to modify growth rate
        if (hasUpgrade('r', 11)) growthRate = growthRate.times(upgradeEffect('r', 11));
        if (hasUpgrade('r', 12)) growthRate = growthRate.times(upgradeEffect('r', 12));
        if (hasUpgrade('r', 13)) growthRate = growthRate.pow(upgradeEffect('r', 12));

        // Increase Replicanti by the calculated growth rate
        player.r.points = player.r.points.add((growthRate).times(diff)); 
    },

    // Replicanti Effect: Boosting Time gain
    effect() {
        return player.r.points.add(1).pow(0.15); // Balanced effect to boost Time gain
    },

    effectDescription() {
        return "which boosts Time gain by ×" + format(tmp.r.effect); // Shows the effect multiplier in the layer tab
    },

    // Upgrades to enhance Replicanti growth
    upgrades: {
        11: {
            title: "Increase Growth Rate",
            description: "Time Shards grow 50% faster.",
            cost: new Decimal(10), // Cost in Replicanti
            effect() {
                let eff = new Decimal(1.5); 
                return eff;// 50% growth boost
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
        },
        12: {
            title: "Time Shard Growth",
            description: "Increase growth rate by 100%.",
            cost: new Decimal(100), // Cost in Replicanti
            effect() {
                let eff new Decimal(2); 
                return eff; // Double the growth rate
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
            unlocked() { return hasUpgrade('r', 11); } // Unlock condition: must have Upgrade 11
        },
        13: {
    title: "Exponential Growth",
    description: "Raise Time Shards growth rate to the power of 2.",
    cost: new Decimal(100), // Cost in Replicanti
    effect() {
        let eff = new Decimal(2); // The effect is to raise growth rate to the power of 2
        return eff;
    },
    effectDisplay() { 
        return "^" + format(upgradeEffect(this.layer, this.id)); // Display the effect as a power (e.g., ^2)
    },
    unlocked() { 
        return hasUpgrade('r', 12); // Unlock condition: must have Upgrade 11
    }
},
    }, 
});
