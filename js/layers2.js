addLayer("e", { // 'e' for Early Universe
    name: "Early Universe", // Name of the layer
    symbol: "E", // Symbol for the layer
    position: 1, // Position in the row (next to Big Bang)
    startData() { 
        return {
            unlocked: false, // Initially locked
            points: new Decimal(0), // Initial points
        };
    },
    color: "#FF8C00", // Color for the layer
    requires: new Decimal(100), // Requirement to reset for this layer
    resource: "Subatomic Particles", // Name of prestige currency
    baseResource: "Singularity Points", // Name of base resource
    baseAmount() { return player.b.points }, // Current amount of base resource from Big Bang
    type: "normal", // Type of prestige layer
    exponent: 1.2, // Exponent for point generation
    gainMult() { // Calculate the multiplier for points
        let mult = new Decimal(1);
        // Add more multipliers as needed
        return mult;
    },
    gainExp() { // Calculate the exponent for main currency from bonuses
        return new Decimal(1);
    },
    row: 1, // Row in the layer tree
    hotkeys: [
        {key: "e", description: "E: Reset for Subatomic Particles", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { 
        // Show this layer only if the milestone is achieved
        return hasMilestone("b", 0) || player.e.unlocked; // Unlock permanently if unlocked
    },
    onPrestige() {
        player.e.unlocked = true; // Set the layer to be permanently unlocked upon prestige
    },
    effect() {
        // Calculate effect based on current Subatomic Particles
        return player.e.points.add(1).pow(2); // (x + 1)^2
    },
    effectDisplay() {
        return format(this.effect()) + "x"; // Display the effect in a readable format
    },
    upgrades: {
        11: {
            title: "Singularity Particles Formation",
            description: "The Effect Affects Singularity Points",
            cost: new Decimal(1),
            unlocked() { return true; }, // Always unlocked
        },
        12: {
            title: "Matter-Antimatter Asymmetry",
            description: "Boosts Matter generation based on current Subatomic Particles",
            cost: new Decimal(25),
            effect() {
                return player.e.points.add(1).log10().pow(0.5); // Scale with Subatomic Particles
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("e", 11); }, // Unlocked after first upgrade
        },
    }
});
