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
    requires: new Decimal(5e7), // Requirement to reset for this layer
    resource: "Subatomic Particles", // Name of prestige currency
    baseResource: "Matter", // Name of base resource
    baseAmount() { return player.points }, // Current amount of base resource from Big Bang
    type: "normal", // Type of prestige layer
    exponent: 0.009, // Exponent for point generation
    gainMult() { // Calculate the multiplier for points
        let mult = new Decimal(1);
        if (hasMilestone("e", 0)) {
            mult = mult.mul(2);
        }
        if (hasUpgrade("b", 24)) {
            mult = mult.mul(upgradeEffect("b", 24));
        }
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
        let eff = player.e.points.add(1).max(1); // Calculate base effect
        eff = eff.pow(2); // Apply square power
        return eff; // Return the calculated effect
    },
    effectDescription() {
        return "which boosts Matter generation by " + format(this.effect()) + "x"; // Display the effect
    },
    milestones: {
        0: {
            requirementDescription: "5 Subatomic Particles", // Requirement to unlock
            effectDescription: "Keep the singularities upgrades after resetting in the Early Universe layer also 2x Subatomic Particles.", // Effect when unlocked
            done() { return player.e.points.gte(5); }, // Check if the Big Bang layer is unlocked
            unlocked() { return true; }, // Always unlocked once conditions are met
        },
         1: {
            requirementDescription: "50 Subatomic Particles", // Requirement to unlock
            effectDescription: "Unlocks New Upgrades in Singularities and Passive Generation", // Effect when unlocked
            done() { return player.e.points.gte(50); }, // Check if the Big Bang layer is unlocked
            unlocked() { return true; }, // Always unlocked once conditions are met
        },
    },
    upgrades: {
        11: {
            title: "Singularity Particles Formation",
            description: "The Effect Affects Singularity Points",
            cost: new Decimal(5),
            unlocked() { return true; }, // Always unlocked
        },
        12: {
            title: "Accelerated Expansion",
            description: "10x the Singularity Points gain.",
            cost: new Decimal(10),
            effect() {
                let eff = new Decimal(10); // Effect is a straightforward multiplication of Singularity Points
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; }, // Display as "10x"
            unlocked() { return hasUpgrade("e", 11); }, // Unlocked after the first upgrade
        },
        13: {
            title: "Cosmic Synergy",
            description: "Boosts the base of Universal Beginning by adding a logarithmic function of Subatomic Particles",
            cost: new Decimal(25),
            effect() {
                let eff = player.e.points.add(1).log10().add(1).pow(0.25); // Logarithmic effect without internal +1
                return eff;
            },
            effectDisplay() { return "+" + format(this.effect()); }, // Display the effect as a "+x" modifier
            unlocked() { return hasUpgrade("e", 12); }, // Unlocked after the previous upgrade
        },
          21: {
        title: "Subatomic Mastery",
        description: "Boosts the base of All the Upgrades Masteries",
        cost: new Decimal(1e7),
        effect() {
            let eff = player.e.points.add(1).log10().add(1).pow(0.05); // Logarithmic effect with reduced exponent
            return eff;
        },
        effectDisplay() { return "+" + format(this.effect()); }, // Display the effect as a "+x" modifier
        unlocked() { return hasUpgrade("b", 34); }, // Unlocked after the previous upgrade
    },
    }
});

addLayer("d", {
    name: "Dark Ages", // Full name of the layer
    symbol: "D", // Symbol to represent the layer
    position: 2, // Position in the layer tree
    startData() { 
        return {
            unlocked: false, // Initially locked
            points: new Decimal(0), // Initial points (though not used)
        };
    },
    color: "#2B2D42", // Dark, cosmic color
    requires: new Decimal(1e100), // Requirement to unlock this layer (1e100 Matter)
    resource: "Dark Matter", // Name of the resource (purely thematic)
    baseResource: "Points", // Resource required to unlock (using player points, which is Matter)
    baseAmount() { return player.points; }, // Amount of Matter (player points)
    type: "normal", // Standard layer behavior
    exponent: 0.01, // The exponent for point generation
    row: 2, // Row in the layer tree
    hotkeys: [
        {key: "d", description: "D: Enter the Dark Ages", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { 
        return player.points.gte(1e100) || player.d.unlocked; // Show when 1e200 Matter is reached or if the layer is unlocked
    },

    // Main Challenge
    challenges: {
        11: {
            name: "Primordial Darkness",
            challengeDescription: "Upgrades 32 and 33 in the Big Bang layer are disabled.",
            goalDescription: "Reach 1e5 Singularity Points.",
            rewardDescription: "Upgrades 32 and 33 are stronger after completing this challenge and also 10x singularity points.",
            canComplete() { return player.b.points.gte(1e5); }, // Completion condition
            unlocked() { return true; }, // Always unlocked for this layer
            
            // Disables specific upgrades when the challenge is active
            onEnter() {
                player.challenging = true; // Flag indicating a challenge is active
                
                // Disable upgrades 32 and 33 in the Big Bang layer
                player.b.upgradesDisabled = { 32: true, 33: true };
            },
            onExit() {
                player.challenging = false; // Remove the challenge flag
                
                // Re-enable upgrades 32 and 33 in the Big Bang layer
                delete player.b.upgradesDisabled;
            },
            onComplete() {
                player.b.challengeCompleted = true; // Mark the challenge as completed
            },
        },
    },

    // Layer Effect
    effect() {
        let eff = player.d.points.add(1).log10().pow(0.5); // Calculate the effect based on Dark Matter
        return eff;
    },
  effectDescription() {
    return "which adds to the first upgrade base by " + "+" + format(this.effect()); // Display the effect
},
});
