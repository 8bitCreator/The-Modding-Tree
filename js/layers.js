addLayer("e", {
    name: "Elements", // Layer name
    symbol: "🌍", // Layer symbol
    position: 1, // Position in the row
    startData() { 
        return {                  
            unlocked: true, // Layer is unlocked by default
            points: new Decimal(0), // Main currency: Element Points
            fire: new Decimal(0), // Amount of Fire element
            water: new Decimal(0), // Amount of Water element
            earth: new Decimal(0), // Amount of Earth element
            air: new Decimal(0), // Amount of Air element
            autoBuyables: false, // Auto-buyer is initially disabled
        }
    },
    color: "#FFA500", // Color for the layer
    resource: "element points", // Main prestige currency
    row: 0, // Row in the tree, 0 is the first row

    baseResource: "points", // Base resource to calculate prestige
    baseAmount() { return player.points }, // Current amount of baseResource
    requires: new Decimal(10), // Requirement to unlock the layer
    type: "normal", // Prestige type
    exponent: 0.5, // Prestige currency gain exponent

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
        // Calculate element gains per second
        let elementBoost = player.e.points.add(1).pow(0.5); // Boost based on Element Points
        let fireGain = player.e.buyables[11].add(1).pow(0.5).mul(elementBoost).mul(diff);
        let waterGain = player.e.buyables[12].add(1).pow(0.5).mul(elementBoost).mul(diff);
        let earthGain = player.e.buyables[13].add(1).pow(0.5).mul(elementBoost).mul(diff);
        let airGain = player.e.buyables[14].add(1).pow(0.5).mul(elementBoost).mul(diff);

        // Add the calculated gains to the respective element totals
        player.e.fire = player.e.fire.add(fireGain);
        player.e.water = player.e.water.add(waterGain);
        player.e.earth = player.e.earth.add(earthGain);
        player.e.air = player.e.air.add(airGain);

        // Call the auto-buy function if autoBuyables is enabled and milestone is reached
        if (player.e.autoBuyables) {
            this.autoBuyBuyables();
        }
    },

    effect() {
        return {
            fireEffect: player.e.fire.add(1).pow(0.25), // Fire increases something
            waterEffect: player.e.water.add(1).pow(0.25), // Water effect
            earthEffect: player.e.earth.add(1).pow(0.25), // Earth effect
            airEffect: player.e.air.add(1).pow(0.25), // Air effect
        }
    },

    effectDescription() {
        let elementBoost = player.e.points.add(1).pow(0.5); // Calculate element boost
        return `Your elements are enhancing your powers:
        Fire (${format(player.e.fire)}): ${format(this.effect().fireEffect)}x boost,
        Water (${format(player.e.water)}): ${format(this.effect().waterEffect)}x boost,
        Earth (${format(player.e.earth)}): ${format(this.effect().earthEffect)}x boost,
        Air (${format(player.e.air)}): ${format(this.effect().airEffect)}x boost.\n
        Elemental Boost: ${format(elementBoost)}x boost to all element gains (Fire, Water, Earth, and Air).`; // Clarified element boost display
    },

    buyables: {
        11: {
            title: "Fire Generator",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
            effect(x) { 
                let baseEffect = x.add(1).pow(0.5); // Original effect
                let boost = player.e.buyables[21].add(1).pow(0.3); // Boost from Flame Generator
                return baseEffect.mul(boost); // Apply the boost
            },
            display() {
                return `Generate more Fire. Currently: ${format(player.e.buyables[11])} Fire Generators.\n
                        Each generator produces ${format(this.effect())} Fire per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[11]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.e.buyables[11] = player.e.buyables[11].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            style: { 'background-color': '#FF4500', 'color': '#FFFFFF' }, // Fire color (orange-red)
        },
        12: {
            title: "Water Pump",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
            effect(x) { 
                let baseEffect = x.add(1).pow(0.5); // Original effect
                let boost = player.e.buyables[22].add(1).pow(0.3); // Boost from Geyser
                return baseEffect.mul(boost); // Apply the boost
            },
            display() {
                return `Pump more Water. Currently: ${format(player.e.buyables[12])} Water Pumps.\n
                        Each pump produces ${format(this.effect())} Water per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[12]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.e.buyables[12] = player.e.buyables[12].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            style: { 'background-color': '#1E90FF', 'color': '#FFFFFF' }, // Water color (blue)
        },
        13: {
            title: "Earth Digger",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
            effect(x) { 
                let baseEffect = x.add(1).pow(0.5); // Original effect
                let boost = player.e.buyables[23].add(1).pow(0.3); // Boost from Quake Generator
                return baseEffect.mul(boost); // Apply the boost
            },
            display() {
                return `Dig for more Earth. Currently: ${format(player.e.buyables[13])} Earth Diggers.\n
                        Each digger produces ${format(this.effect())} Earth per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[13]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.e.buyables[13] = player.e.buyables[13].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            style: { 'background-color': '#8B4513', 'color': '#FFFFFF' }, // Earth color (saddle brown)
        },
        14: {
            title: "Air Collector",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
            effect(x) { 
                let baseEffect = x.add(1).pow(0.5); // Original effect
                let boost = player.e.buyables[24].add(1).pow(0.3); // Boost from Tornado Machine
                return baseEffect.mul(boost); // Apply the boost
            },
            display() {
                return `Collect more Air. Currently: ${format(player.e.buyables[14])} Air Collectors.\n
                        Each collector produces ${format(this.effect())} Air per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[14]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.e.buyables[14] = player.e.buyables[14].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            style: { 'background-color': '#87CEEB', 'color': '#FFFFFF' }, // Air color (sky blue)
        },
        21: {
            title: "Flame Generator",
            cost(x) { return new Decimal(100).mul(x.add(1).pow(2)); }, // Starting cost of 100
            effect(x) { return x.add(1).pow(0.3); }, // Effect is a multiplier to Fire Generator base
            display() {
                return `Boost Fire Generator base. Currently: ${format(player.e.buyables[21])} Flame Generators.\n
                        Each generator multiplies Fire Generator base by ${format(this.effect())}x.\n
                        Cost for next: ${format(this.cost(player.e.buyables[21]))} points.`;
            },
            canAfford() { return player.points.gte(this.cost()); },
            buy() {
                player.points = player.points.sub(this.cost());
                player.e.buyables[21] = player.e.buyables[21].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            style: { 'background-color': '#FF6347', 'color': '#FFFFFF' }, // Flame color (tomato red)
        },
        22: {
            title: "Geyser",
            cost(x) { return new Decimal(100).mul(x.add(1).pow(2)); }, // Starting cost of 100
            effect(x) { return x.add(1).pow(0.3); }, // Effect is a multiplier to
