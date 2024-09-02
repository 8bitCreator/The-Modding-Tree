addLayer("i", { // 'i' for "Initial Expansion"
    name: "Initial Expansion",
    symbol: "I",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0), // Your resource, e.g., "Energy Particles"
    }},
    color: "#FFD700", // Gold color for energy
    requires: new Decimal(10), // Amount of "points" needed to prestige
    resource: "Inflation Points", // Prestige currency
    baseResource: "energy particles", // Resource needed to gain prestige currency
    baseAmount() {return player.points}, // Function to get the current amount of energy particles
    type: "normal",
    exponent: 0.5, // Adjust based on how you want prestige scaling
    gainMult() {
        let mult = new Decimal(1);
        
        // Apply upgrade effect for upgrade 11 if bought
        if (hasUpgrade('i', 11)) mult = mult.times(upgradeEffect('i', 11));
        
        // Apply upgrade effect for upgrade 14 if bought
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14));

        return mult;
    },
    gainExp() {
        return new Decimal(1); // Exponent for gaining resources
    },
    row: 0, // First row on the tree
    hotkeys: [
        {key: "i", description: "I: Reset for Inflation Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
       11: {
        title: "Energy Amplification",
        description: "Boost Inflation Points gain based on current energy particles.",
        cost: new Decimal(10), // Increased cost to 10 Inflation Points
        effect() {
            return player.points.add(1).pow(0.4); // Reduced exponent from 0.5 to 0.4
        },
        effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
    },
    12: {
        title: "Self-Sustaining Energy",
        description: "Boost energy particles gain based on current energy particles.",
        cost: new Decimal(20), // Increased cost to 20 Inflation Points
        effect() {
            let eff = player.points.add(1).pow(0.2); // Reduced exponent from 0.3 to 0.2

            // Check if Upgrade 21 is bought, and apply its effect
            if (hasUpgrade('i', 21)) {
                let upgrade21Effect = upgradeEffect('i', 21); // Get the effect of Upgrade 21
                eff = eff.pow(upgrade21Effect); // Apply the exponent boost from Upgrade 21
            }

            return eff;
        },
        effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
    },
    13: {
        title: "Inflation Empowerment",
        description: "Boost energy particles gain based on current Inflation Points.",
        cost: new Decimal(30), // Increased cost to 30 Inflation Points
        effect() {
            return player.i.points.add(1).pow(0.3); // Reduced exponent from 0.4 to 0.3
        },
        effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
    },
    14: {
        title: "Self-Inflation",
        description: "Boost Inflation Points gain based on current Inflation Points.",
        cost: new Decimal(40), // Increased cost to 40 Inflation Points
        effect() {
            let baseEffect = player.i.points.add(1).pow(0.4); // Reduced exponent from 0.5 to 0.4

            // Check if Upgrade 22 is bought, and apply its effect
            if (hasUpgrade('i', 22)) {
                let upgrade22Effect = upgradeEffect('i', 22); // Get the effect of Upgrade 22
                baseEffect = baseEffect.pow(upgrade22Effect); // Raise the base effect by the expBoost from Upgrade 22
            }

            return baseEffect;
        },
        effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
    },
    21: {
        title: "Empowered Energy",
        description: "Raise the effect of Self-Sustaining Energy based on current Inflation Points.",
        cost: new Decimal(50), // Increased cost to 50 Inflation Points
        effect() {
            // Reduce the exponent boost to balance the impact
            let expBoost = player.i.points.add(1).log10().div(15).add(1); // log10(In Points + 1) / 15 + 1
            return expBoost;
        },
        effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) }, // Display the exponent multiplier
        unlocked() { return hasUpgrade('i', 12); }, // Only unlock if the player has bought Upgrade 12
    },
    22: {
        title: "Energy Inflation",
        description: "Raise the effect of Self-Inflation based on current energy particles.",
        cost: new Decimal(70), // Increased cost to 70 Inflation Points
        effect() {
            // Reduce the exponent boost to balance the impact
            let expBoost = player.points.add(1).log10().div(15).add(1); // log10(player.points + 1) / 15 + 1
            return expBoost;
        },
        effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) }, // Display the exponent multiplier
        unlocked() { return hasUpgrade('i', 14); }, // Only unlock if the player has bought Upgrade 14
    },
        // Additional upgrades can be added here
    },

    // Adding tabs for Phases 2 and 3
    tabFormat: {
        "Phase 1": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades", // This includes the upgrades you've defined
                // Add more content specific to Phase 1
            ],
        },
        "Phase 2: Matter Formation": {
            content: [
                ["display-text", "Matter Formation begins as energy cools and particles combine..."],
                // Add content specific to Phase 2
            ],
            unlocked() { return player.i.points.gte(100) } // Example: Unlock Phase 2 after 100 Inflation Points
        },
        "Phase 3: Structure Formation": {
            content: [
                ["display-text", "As matter forms, stars and galaxies begin to emerge..."],
                // Add content specific to Phase 3
            ],
            unlocked() { return player.i.points.gte(1000) } // Example: Unlock Phase 3 after 1000 Inflation Points
        },
    },
})
