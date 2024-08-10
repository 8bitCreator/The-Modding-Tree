addLayer("e", {
    name: "Elements", // Layer name
    symbol: "🌍", // Layer symbol
    position: 1, // Position in the row
    startData() { return {                  
        unlocked: true, // Layer is unlocked by default
        points: new Decimal(0), // Main currency: Element Points
        fire: new Decimal(0), // Amount of Fire element
        water: new Decimal(0), // Amount of Water element
        earth: new Decimal(0), // Amount of Earth element
        air: new Decimal(0), // Amount of Air element
    }},
    color: "#FFA500", // Color for the layer
    resource: "element points", // Main prestige currency
    row: 0, // Row in the tree, 0 is the first row

    baseResource: "points", // Base resource to calculate prestige
    baseAmount() { return player.points }, // Current amount of baseResource
    requires: new Decimal(10), // Requirement to unlock the layer
    type: "normal", // Prestige type
    exponent: 0.5, // Prestige currency gain exponent

    gainMult() { // Multiplier to prestige currency gain
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Exponent to prestige currency gain
        let exp = new Decimal(1)
        return exp
    },

    layerShown() { return true }, // Always show this layer

    // This function updates the elements over time
    update(diff) {
        // Base element gains per second
        let baseFireGain = player.e.buyables[11].add(1).pow(0.5);
        let baseWaterGain = player.e.buyables[12].add(1).pow(0.5);
        let baseEarthGain = player.e.buyables[13].add(1).pow(0.5);
        let baseAirGain = player.e.buyables[14].add(1).pow(0.5);

        // Apply upgrades to the gains
        let fireGain = baseFireGain.mul(upgradeEffect(11)).mul(diff);
        let waterGain = baseWaterGain.mul(upgradeEffect(12)).mul(diff);
        let earthGain = baseEarthGain.mul(upgradeEffect(13)).mul(diff);
        let airGain = baseAirGain.mul(upgradeEffect(14)).mul(diff);

        // Update player's element totals
        player.e.fire = player.e.fire.add(fireGain);
        player.e.water = player.e.water.add(waterGain);
        player.e.earth = player.e.earth.add(earthGain);
        player.e.air = player.e.air.add(airGain);
    },

    effect() {
        return {
            fireEffect: player.e.fire.add(1).pow(0.5), // Fire increases something
            waterEffect: player.e.water.add(1).pow(0.5), // Water effect
            earthEffect: player.e.earth.add(1).pow(0.5), // Earth effect
            airEffect: player.e.air.add(1).pow(0.5), // Air effect
        }
    },

    effectDescription() {
        return `Your elements are enhancing your powers:
        Fire (${format(player.e.fire)}): ${format(this.effect().fireEffect)}x boost,
        Water (${format(player.e.water)}): ${format(this.effect().waterEffect)}x boost,
        Earth (${format(player.e.earth)}): ${format(this.effect().earthEffect)}x boost,
        Air (${format(player.e.air)}): ${format(this.effect().airEffect)}x boost.`
    },

    upgrades: {
        11: {
            title: "Ignite",
            description: "Boost Fire gain based on your total Element Points.",
            cost: new Decimal(1),
            effect() {
                return player.e.points.add(1).pow(0.25);
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Tooltip display
        },
        12: {
            title: "Flow",
            description: "Boost Water gain based on your total Element Points.",
            cost: new Decimal(2),
            effect() {
                return player.e.points.add(1).pow(0.25);
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
        13: {
            title: "Solidify",
            description: "Boost Earth gain based on your total Element Points.",
            cost: new Decimal(3),
            effect() {
                return player.e.points.add(1).pow(0.25);
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
        14: {
            title: "Gust",
            description: "Boost Air gain based on your total Element Points.",
            cost: new Decimal(4),
            effect() {
                return player.e.points.add(1).pow(0.25);
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
    },

    buyables: {
        11: {
            title: "Fire Generator",
            cost(x) { return new Decimal(10).mul(x.add(1)) },
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Generate more Fire. Currently: ${format(player.e.buyables[11])} Fire.\n
                        Each generator produces ${format(this.effect())} Fire per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[11]))} points.`
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                player.e.buyables[11] = player.e.buyables[11].add(1)
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
        12: {
            title: "Water Pump",
            cost(x) { return new Decimal(20).mul(x.add(1)) },
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Pump more Water. Currently: ${format(player.e.buyables[12])} Water.\n
                        Each pump produces ${format(this.effect())} Water per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[12]))} points.`
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                player.e.buyables[12] = player.e.buyables[12].add(1)
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
        13: {
            title: "Earth Digger",
            cost(x) { return new Decimal(30).mul(x.add(1)) },
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Dig for more Earth. Currently: ${format(player.e.buyables[13])} Earth.\n
                        Each digger produces ${format(this.effect())} Earth per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[13]))} points.`
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                player.e.buyables[13] = player.e.buyables[13].add(1)
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
        14: {
            title: "Air Collector",
            cost(x) { return new Decimal(40).mul(x.add(1)) },
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Collect more Air. Currently: ${format(player.e.buyables[14])} Air.\n
                        Each collector produces ${format(this.effect())} Air per second.\n
                        Cost for next: ${format(this.cost(player.e.buyables[14]))} points.`
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                player.e.buyables[14] = player.e.buyables[14].add(1)
            },
            effectDisplay() { return format(this.effect()) + "x" },
        },
    },
});
