addLayer("r", { // 'r' for "TimeShards"
    name: "Time Shards",
    symbol: "R",
    position: 0, 
    startData() { 
        return {
            unlocked: true, 
            points: new Decimal(0), // Time Shards
            boosts: new Decimal(0),  // Number of Time Shard Boosts
        } 
    },
    color: "#800020", 
    resource: "Time Shards",
    baseResource: "time",
    type: "none", // No prestige reset
    row: 0, 
    hotkeys: [
        {key: "r", description: "R: Reset for Time Shard Boost", onPress(){if (layers.r.canBoost()) layers.r.doBoost()}}, // Fixed reference
    ],
    layerShown(){return true}, // Show this layer

    // Multiplier based on Time Shard Boosts
    boostMultiplier() {
        return new Decimal(3).pow(player.r.boosts); // Each boost multiplies Time Shard production by 3x
    },

    // Effect: Player Points (Time) boosting Replicanti
    playerPointsBoost() {
        return player.points.add(1).pow(0.2); // Example: Boost based on Player Points raised to 0.2 power
    },

    // Calculate the cost for the next Time Shard Boost
    boostCost() {
        let baseCost = new Decimal(1000); // Starting cost for the first boost
        let scaleFactor = new Decimal(33); // Scaling factor per boost
        return baseCost.times(scaleFactor.pow(player.r.boosts)); // Exponential cost scaling
    },

    // Update function to handle Time Shard generation
    update(diff) {
        let growthRate = new Decimal(1)
            .times(layers.r.boostMultiplier())  // Apply Time Shard Boost multiplier
            .times(layers.r.playerPointsBoost()); // Apply Player Points (Time) boost to growth rate

        // Apply upgrade effects to modify growth rate
        if (hasUpgrade('r', 11)) growthRate = growthRate.times(upgradeEffect('r', 11));
        if (hasUpgrade('r', 12)) growthRate = growthRate.times(upgradeEffect('r', 12));
        if (hasUpgrade('r', 13)) growthRate = growthRate.pow(upgradeEffect('r', 13)); // Apply Upgrade 13 effect
        if (hasUpgrade('r', 21)) growthRate = growthRate.times(upgradeEffect('r', 21));
        if (hasUpgrade('r', 23)) growthRate = growthRate.times(upgradeEffect('r', 23));
        if (hasUpgrade('r', 22)) growthRate = growthRate.pow(upgradeEffect('r', 22));

        // Increase Time Shards by the calculated growth rate
        player.r.points = player.r.points.add(growthRate.times(diff)); 
    },

    // Display Time Shard Boost and Player Points boost in the layer tab
    effectDescription() {
        return `Time Shard Boosts: ×${format(layers.r.boostMultiplier())} and Player Points boost: ×${format(layers.r.playerPointsBoost())}`;
    },

    // Clickable to perform Time Shard Boost
    clickables: {
        11: {
            title: "Perform Time Shard Boost",
            display() { 
                return `Perform a Time Shard Boost for a 3x multiplier (currently ×${format(layers.r.boostMultiplier())})\nCost: ${format(layers.r.boostCost())} Time Shards\nThis will reset your Time Shards and upgrades!`; 
            },
            canClick() {
                return player.r.points.gte(layers.r.boostCost()); // Check if the player has enough Time Shards for the next boost
            },
            onClick() { 
                layers.r.doBoost(); // Call the boost function
            },
            style() {
                return {'height':'100px', 'width':'300px'}; // Customize button size and style
            }
        }
    },

    // Boost reset function
    doBoost() {
        if (!layers.r.clickables[11].canClick()) return; // Ensure player can click the boost button

        player.r.boosts = player.r.boosts.add(1); // Increment the boost counter
        player.r.points = new Decimal(0); // Reset Time Shards
        layerDataReset("r", ["boosts"]); // Reset upgrades and other layer-specific data, except boosts
    },
    
    // Upgrades to enhance Time Shard growth
    upgrades: {
        11: {
            title: "Increase Growth Rate",
            description: "Time Shards grow 50% faster.",
            cost: new Decimal(10),
            effect() {
                return new Decimal(1.5); 
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) },
        },
        12: {
            title: "Time Shard Growth",
            description: "Double the Time Shard growth rate.",
            cost: new Decimal(100),
            effect() {
                return new Decimal(2); 
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() { return hasUpgrade('r', 11); }
        },
        13: {
            title: "Exponential Growth",
            description: "Raise Time Shard growth rate to the power of 2.",
            cost: new Decimal(300),
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { 
                return "^" + format(upgradeEffect(this.layer, this.id)); 
            },
            unlocked() { return hasUpgrade('r', 12); }
        },
         21: {
            title: "Advanced Time Manipulation",
            description: "Time Shards grow 200% faster after upgrade 13 exponentiation",
            cost: new Decimal(100000),
            effect() {
                return new Decimal(3); 
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() { return player.r.boosts.gte(3); } // Unlock after 3 Time Shard Boosts
        },
        22: {
            title: "Useless",
            description: "Time Shards growth rate is raised to the power of 1.01.",
            cost: new Decimal(100000),
            effect() {
                return new Decimal(1.01);
            },
            effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)); },
            unlocked() { return hasUpgrade('r', 21); } // Unlock after upgrade 21
        },
        23: {
            title: "Final Time Shard Boost",
            description: "Time Shards grow 300% faster after upgrade 13 exponentation and before upgrade 21 exponentation",
            cost: new Decimal(100000),
            effect() {
                return new Decimal(3); 
            },
            effectDisplay() { return "×" + format(upgradeEffect(this.layer, this.id)) },
            unlocked() { return hasUpgrade('r', 22); } // Unlock after upgrade 22
        },
    }, 
});
