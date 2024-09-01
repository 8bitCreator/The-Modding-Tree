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
        if (hasUpgrade("e", 23)) {
            mult = mult.mul(upgradeEffect("e", 23));
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
        2: {
            requirementDescription: "1000 Subatomic Particles", // Requirement to unlock
            effectDescription: "Unlocks a new layer and passive subatomic generation", // Effect when unlocked
            done() { return player.e.points.gte(1000); }, // Check if the Big Bang layer is unlocked
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
            description: "Boost Singularity Points gain.",
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
        description: "adds to the base of All the Upgrades Masteries",
        cost: new Decimal(100),
        effect() {
            let eff = player.e.points.add(1).log10().add(1).pow(0.05); // Logarithmic effect with reduced exponent
            return eff;
        },
        effectDisplay() { return "+" + format(this.effect()); }, // Display the effect as a "+x" modifier
        unlocked() { return hasUpgrade("b", 34); }, // Unlocked after the previous upgrade
    },
        22:{
            title: "Cosmic Mastery",
            description:"Adds to the base of Cosmic Expansion",
            cost: new Decimal(250),
            effect() { 
                let eff = player.e.points.add(1).log10().add(1).pow(0.5)
                return eff 
                },
             effectDisplay() { return "+" + format(this.effect()); },
            unlocked() { 
    return player.d.challengeCompleted === true; 
},

    },
        23: {
    title: "Singularity to Subatomic Boost",
    description: "Boost Subatomic Particles based on Singularity Points.",
    cost: new Decimal(300),
    effect() { 
        let eff = player.b.points.add(1).log10().pow(0.3); // Assuming 's' represents Singularity Points
        return eff;
    },
    effectDisplay() { return format(this.effect()) + "x"; },
    unlocked() { 
        return hasUpgrade("b", 34);  
    },
},

        },
     passiveGeneration() {
        // Base generation rate
        let passive = new Decimal(0); // Adjust base value as needed

        // Adjust generation based on current upgrades or player status
        if (hasMilestone("e", 2)) { // Check if the upgrade is unlocked
            passive = passive.add(1) // Apply effect of upgrade 24
        } 
        return passive 
        },
});


