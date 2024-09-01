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
            cost: new Decimal(5), // Cost in Inflation Points
            effect() {
                return player.points.add(1).pow(0.5); // Boost to Inflation Points based on energy particles
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
        },
        12: {
            title: "Self-Sustaining Energy",
            description: "Boost energy particles gain based on current energy particles.",
            cost: new Decimal(10), // Cost in Inflation Points
            effect() {
                return player.points.add(1).pow(0.3); // Example: smaller boost to energy particles themselves
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
        },
        13: {
            title: "Inflation Empowerment",
            description: "Boost energy particles gain based on current Inflation Points.",
            cost: new Decimal(15), // Cost in Inflation Points
            effect() {
                return player.i.points.add(1).pow(0.4); // Example: boost energy particles based on Inflation Points
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
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
