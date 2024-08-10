addLayer("e", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            buyables: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)] // Initialize buyable amounts
        };
    },

    color: "#4BDC13",
    resource: "elements",
    row: 1,

    update(diff) {
        // Generate elements based on the buyables' effects
        let fireGain = player.e.buyables[11].add(1).pow(0.5).mul(UpgradeEffect11).mul(diff);
        let waterGain = player.e.buyables[12].add(1).pow(0.5).mul(UpgradeEffect12).mul(diff);
        let earthGain = player.e.buyables[13].add(1).pow(0.5).mul(UpgradeEffect13).mul(diff);
        let airGain = player.e.buyables[14].add(1).pow(0.5).mul(UpgradeEffect14).mul(diff);

        player.e.points = player.e.points.add(fireGain).add(waterGain).add(earthGain).add(airGain);
    },

    layerShown() { return true },

    buyables: {
        11: {
            title: "Fire Generator",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)) }, // Starting cost of 10
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Currently: ${format(player.e.buyables[11])} Fire Generators.\n
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
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)) }, // Starting cost of 10
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Currently: ${format(player.e.buyables[12])} Water Pumps.\n
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
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)) }, // Starting cost of 10
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Currently: ${format(player.e.buyables[13])} Earth Diggers.\n
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
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)) }, // Starting cost of 10
            effect(x) { return x.add(1).pow(0.5) },
            display() {
                return `Currently: ${format(player.e.buyables[14])} Air Collectors.\n
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
