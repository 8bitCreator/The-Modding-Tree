addLayer("i", { // 'i' for "Initial Expansion"
    name: "Initial Expansion",
    symbol: "I",
    position: 0,
    startData() { return {
        unlocked: true,
        points: new Decimal(0), // Your resource, e.g., "Energy Particles"
        matter: new Decimal(0), // New resource for Phase 2
    }},
    color: "#FFD700", // Gold color for energy
    requires: new Decimal(10), // Amount of "points" needed to prestige
    resource: "Inflation Points", // Prestige currency
    baseResource: "energy particles", // Resource needed to gain prestige currency
    baseAmount() { return player.points }, // Function to get the current amount of energy particles
    type: "normal",
    exponent: 0.5, // Adjust based on how you want prestige scaling
    gainMult() {
        let mult = new Decimal(1);
        
        // Apply upgrade effect for upgrade 11 if bought
        if (hasUpgrade('i', 11)) mult = mult.times(upgradeEffect('i', 11));
        
        // Apply upgrade effect for upgrade 14 if bought
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14));

        // Apply Matter effect if in Phase 2
        if (player.i.matter.gt(0)) mult = mult.times(tmp.i.effect); // Use the calculated Matter effect

        return mult;
    },
    gainExp() {
        return new Decimal(1); // Exponent for gaining resources
    },
    row: 0, // First row on the tree
    hotkeys: [
        { key: "i", description: "I: Reset for Inflation Points", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true },

    // Adding tabs for Phases 1, 2, and 3
    tabFormat: {
        "Phase 1: Initial Expansion": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "upgrades", // This includes the upgrades you've defined
            ],
        },
        "Phase 2: Matter Formation": {
            content: [
                ["raw-html",
                function () {
                    if (player.tab == "i" && player.subtabs.i.mainTabs == "Phase 2: Matter Formation") {
                        let a = "You have " + colorText("h2", "#FFD700", formatWhole(player.i.matter)) + " Matter<br>"
                        a += "Matter is generated based on your Inflation Points every second.<br>"
                        a += "Matter boosts energy particle gain by ×" + format(tmp.i.effect) + ".<br>"
                        return a;
                    }
                }],
                ["row", [["upgrade", 31]]], // Matter Compression
                ["row", [["upgrade", 32]]], // Stellar Nucleosynthesis
                ["row", [["upgrade", 33]]], // Galaxy Formation
            ],
            unlocked() { return player.i.points.gte(100) || hasUpgrade('i', 22); } // Unlock Phase 2 after 100 Inflation Points or with Upgrade 22
        },
        "Phase 3: Structure Formation": {
            content: [
                ["display-text", "As matter forms, stars and galaxies begin to emerge..."],
                // Add content specific to Phase 3
            ],
            unlocked() { return player.i.points.gte(1000); } // Example: Unlock Phase 3 after 1000 Inflation Points
        },
    },

    // Effect from Matter
    effect() {
        return player.i.matter.add(1).pow(0.1); // Example: Base Matter effect that boosts energy gain
    },

    // Updating Matter generation each second
    update(diff) {
        if (player.i.points.gte(100)) { // Check if Phase 2 is unlocked
            let matterGain = player.i.points.add(1).pow(0.05).times(diff); // Matter gain rate
            player.i.matter = player.i.matter.add(matterGain); // Add generated matter
        }
    },
        upgrades: {
        11: {
            title: "Energy Amplification",
            description: "Boost Inflation Points gain based on current energy particles.",
            cost: new Decimal(1), // Increased cost to 10 Inflation Points
            effect() {
                return player.points.add(1).pow(0.3); // Reduced exponent from 0.5 to 0.3
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
        },
        12: {
            title: "Self-Sustaining Energy",
            description: "Boost energy particles gain based on current energy particles.",
            cost: new Decimal(5), // Increased cost to 20 Inflation Points
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
            cost: new Decimal(10), // Increased cost to 30 Inflation Points
            effect() {
                return player.i.points.add(1).pow(0.3); // Reduced exponent from 0.4 to 0.3
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
        },
        14: {
            title: "Self-Inflation",
            description: "Boost Inflation Points gain based on current Inflation Points.",
            cost: new Decimal(15), // Increased cost to 40 Inflation Points
            effect() {
                let baseEffect = player.i.points.add(1).pow(0.2); // Reduced exponent from 0.5 to 0.2

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
            31: {
            title: "Matter Compression",
            description: "Increase Matter gain based on current Inflation Points.",
            cost: new Decimal(100), // Cost in Matter
            currencyDisplayName: "Matter", // Indicate that the cost is in Matter
            currencyInternalName: "matter", // Access the Matter currency
            effect() {
                return player.i.points.add(1).pow(0.2); // Example: Boost to Matter gain based on Inflation Points
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
            unlocked() { return player.i.matter.gte(100) }, // Unlock after gaining 100 Matter
        },
        32: {
            title: "Stellar Nucleosynthesis",
            description: "Boost Inflation Points gain based on current Matter.",
            cost: new Decimal(250), // Cost in Matter
            currencyDisplayName: "Matter", // Indicate that the cost is in Matter
            currencyInternalName: "matter", // Access the Matter currency
            effect() {
                return player.i.matter.add(1).pow(0.15); // Example: Boost Inflation Points gain based on Matter
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
            unlocked() { return player.i.matter.gte(250) }, // Unlock after gaining 250 Matter
        },
        33: {
            title: "Galaxy Formation",
            description: "Increase both Matter and Inflation Points gain based on current Matter.",
            cost: new Decimal(500), // Cost in Matter
            currencyDisplayName: "Matter", // Indicate that the cost is in Matter
            currencyInternalName: "matter", // Access the Matter currency
            effect() {
                let matterBoost = player.i.matter.add(1).pow(0.1);
                return matterBoost;
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) }, // Display the effect multiplier
            unlocked() { return player.i.matter.gte(500) }, // Unlock after gaining 500 Matter
        },
    },
     },)
