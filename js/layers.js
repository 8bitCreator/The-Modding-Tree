addLayer("c", {
    name: "Civilization", // Layer name
    symbol: "🌍", // Layer symbol
    position: 1, // Position in the row
    startData() { 
        return {                  
            unlocked: true, // Layer is unlocked by default
            points: new Decimal(0), // Main currency: Culture
            food: new Decimal(0), // Amount of Food
            wood: new Decimal(0), // Amount of Wood
            stone: new Decimal(0), // Amount of Stone
            copperAge: false, // Milestone for unlocking the Copper Age
            bronzeAge: false, // Milestone for unlocking the Bronze Age
            autoBuyables: false, // Auto-buyer initially disabled
        }
    },
    color: "#8B4513", // Color for the layer
    resource: "culture", // Main prestige currency
    row: 1, // Row in the tree, 1 is the second row

    baseResource: "points", // Base resource to calculate prestige
    baseAmount() { return player.points }, // Current amount of baseResource
    requires: new Decimal(10), // Requirement to unlock the layer
    type: "normal", // No specific type
    exponent: 1, // Default exponent

    gainMult() { // Multiplier to prestige currency gain
        let mult = new Decimal(1);
        return mult;
    },
    gainExp() { // Exponent to prestige currency gain
        let exp = new Decimal(1);
        return exp;
    },

    layerShown() { return true }, // Always show this layer

    update(diff) {
        // Calculate culture gains per second
        let cultureBoost = player.c.points.add(1).pow(0.5); // Boost based on Culture Points
        let foodGain = player.c.buyables[11].add(1).pow(0.5).mul(cultureBoost).mul(diff);
        let woodGain = player.c.buyables[12].add(1).pow(0.5).mul(cultureBoost).mul(diff);
        let stoneGain = player.c.buyables[13].add(1).pow(0.5).mul(cultureBoost).mul(diff);

        // Add the calculated gains to the respective resource totals
        player.c.food = player.c.food.add(foodGain);
        player.c.wood = player.c.wood.add(woodGain);
        player.c.stone = player.c.stone.add(stoneGain);

        // Check for the milestones to unlock Copper and Bronze Ages
        if (player.c.points.gte(1e9) && !player.c.copperAge) {
            player.c.copperAge = true;
        }
        if (player.c.points.gte(1e10) && !player.c.bronzeAge) {
            player.c.bronzeAge = true;
        }

        // Call the auto-buy function if autoBuyables is enabled
        if (player.c.autoBuyables) {
            this.autoBuyBuyables();
        }
    },

    effect() {
        return {
            cultureEffect: player.c.points.add(1).pow(0.25), // Culture effect based on points
        }
    },

    effectDescription() {
        let cultureBoost = player.c.points.add(1).pow(0.5); // Calculate culture boost
        return `Your culture is enhancing your civilization:
        Culture (${format(player.c.points)}): ${format(this.effect().cultureEffect)}x boost.\n
        Culture Boost: ${format(cultureBoost)}x boost to all resource gains (Food, Wood, Stone).`;
    },

    buyables: {
        11: {
            title: "Food Producer",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); },
            effect(x) { 
                return x.add(1).pow(0.5); 
            },
            display() {
                return `Produce more Food. Currently: ${format(player.c.buyables[11])} Food Producers.\n
                        Each producer produces ${format(this.effect())} Food per second.\n
                        Cost for next: ${format(this.cost(player.c.buyables[11]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.c.buyables[11] = player.c.buyables[11].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            color: "#FF6347", // Tomato color for Food
        },
        12: {
            title: "Woodcutter",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); },
            effect(x) { 
                return x.add(1).pow(0.5); 
            },
            display() {
                return `Cut more Wood. Currently: ${format(player.c.buyables[12])} Woodcutters.\n
                        Each cutter produces ${format(this.effect())} Wood per second.\n
                        Cost for next: ${format(this.cost(player.c.buyables[12]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.c.buyables[12] = player.c.buyables[12].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            color: "#8B4513", // SaddleBrown color for Wood
        },
        13: {
            title: "Stone Quarry",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); },
            effect(x) { 
                return x.add(1).pow(0.5); 
            },
            display() {
                return `Extract more Stone. Currently: ${format(player.c.buyables[13])} Stone Quarries.\n
                        Each quarry produces ${format(this.effect())} Stone per second.\n
                        Cost for next: ${format(this.cost(player.c.buyables[13]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.c.buyables[13] = player.c.buyables[13].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            color: "#A9A9A9", // DarkGray color for Stone
        },
    },

    upgrades: {
        11: {
            title: "Food Efficiency",
            description: "Boosts the effect of Food Producers by 10%.",
            cost: new Decimal(10),
            effect() {
                return new Decimal(1.10); // 10% boost to Food Producer effect
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e9); },
        },
        12: {
            title: "Lumber Efficiency",
            description: "Boosts the effect of Woodcutters by 10%.",
            cost: new Decimal(100),
            effect() {
                return new Decimal(1.10); // 10% boost to Woodcutter effect
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e9); },
        },
        13: {
            title: "Stone Efficiency",
            description: "Boosts the effect of Stone Quarries by 10%.",
            cost: new Decimal(1000),
            effect() {
                return new Decimal(1.10); // 10% boost to Stone Quarry effect
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e9); },
        },
        14: {
            title: "Cultural Agriculture",
            description: "Boosts Food Producers based on Culture by 5%.",
            cost: new Decimal(1e4),
            effect() {
                return player.c.points.add(1).pow(0.05); // Boost Food Producer based on Culture Points
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e10); },
        },
        15: {
            title: "Cultural Lumber",
            description: "Boosts Woodcutters based on Culture by 5%.",
            cost: new Decimal(1e5),
            effect() {
                return player.c.points.add(1).pow(0.05); // Boost Woodcutter based on Culture Points
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e10); },
        },
        16: {
            title: "Cultural Stone",
            description: "Boosts Stone Quarries based on Culture by 5%.",
            cost: new Decimal(1e6),
            effect() {
                return player.c.points.add(1).pow(0.05); // Boost Stone Quarry based on Culture Points
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e10); },
        },
        17: {
            title: "Cultural Renaissance",
            description: "Significantly boosts all resource production based on Culture.",
            cost: new Decimal(1e12),
            effect() {
                return player.c.points.add(1).pow(0.1); // Boost all resource production significantly
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return player.c.points.gte(1e12); },
        },
    },

    autoBuyBuyables() {
        if (player.c.autoBuyables) {
            for (let i = 11; i <= 13; i++) {
                if (player.points.gte(this.buyables[i].cost())) {
                    this.buyables[i].buy();
                }
            }
        }
    }
});
