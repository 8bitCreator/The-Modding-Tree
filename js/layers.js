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
        // Add logic to modify the multiplier if needed (e.g., based on upgrades)
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

    // Adding tabs for Phases 2 and 3
    tabFormat: {
        "Phase 1": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades",
                // Add more content specific to Phase 1
            ],
        },
        "Phase 2: Matter Formation": {
            content: [
                ["display-text", "Matter Formation begins as energy cools and particles combine..."],
                // Add content specific to Phase 2
            ],
            unlocked() { return player.i.points.gte(1) } // Example: Unlock Phase 2 after 100 Inflation Points
        },
        "Phase 3: Structure Formation": {
            content: [
                ["display-text", "As matter forms, stars and galaxies begin to emerge..."],
                // Add content specific to Phase 3
            ],
            unlocked() { return player.i.points.gte(1) } // Example: Unlock Phase 3 after 1000 Inflation Points
        },
    },
})
