addLayer("n", {
    name: "Neolithic",
    symbol: "N",
    position: 1,
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
    }},
    color: "#228B22",
    requires: new Decimal(10),
    resource: "Crops",
    baseResource: "Paleolithic Points",
    baseAmount() { return player.p.points },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade(this.layer, 11)) mult = mult.times(2)
        if (hasUpgrade(this.layer, 12)) mult = mult.times(2)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    row: 1,
    layerShown() { return player.p.best.gte(10) },

    upgrades: {
        11: {
            title: "Agricultural Techniques",
            description: "Increase crop yield efficiency by 100%.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(2)
            },
            effectDescription() {
                return "increasing crop yield efficiency by " + format(this.effect()) + "x"
            },
        },
        12: {
            title: "Pottery",
            description: "Unlock pottery making, enhancing storage and cooking methods.",
            cost: new Decimal(5),
            effect() {
                return new Decimal(2)
            },
            effectDescription() {
                return "increasing overall productivity by " + format(this.effect()) + "x"
            },
        },
    },

    buyables: {
        11: {
            title: "Plows",
            cost(x) { return new Decimal(1).mul(x.add(1)) },
            display() { 
                return "Plows: Improve farming efficiency. Cost: " + format(this.cost()) + " crops. Amount: " + getBuyableAmount(this.layer, this.id)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                addBuyables(this.layer, this.id, new Decimal(1))
            },
            effect(x) { return x.add(1).pow(0.5) },
        },
        12: {
            title: "Weaving Looms",
            cost(x) { return new Decimal(3).mul(x.add(1)) },
            display() { 
                return "Weaving Looms: Improve production of textiles. Cost: " + format(this.cost()) + " crops. Amount: " + getBuyableAmount(this.layer, this.id)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                addBuyables(this.layer, this.id, new Decimal(1))
            },
            effect(x) { return x.add(1).pow(0.7) },
        },
    },

    milestones: {
        0: {
            requirementDescription: "10 Crops",
            effectDescription: "Unlock the Bronze Age.",
            done() { return player.n.points.gte(10) }
        },
    },

    tooltip() { return "The era of technological advancements in agriculture, pottery, and weaving." },
    tooltipLocked() { return "You need to unlock this era." },

    branches: [], // Can add future layers here
});
