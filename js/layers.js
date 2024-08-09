addLayer("e", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
            energyCap: new Decimal(100),
            energyMult: new Decimal(1),
        }
    },

    color: "#4BDC13",
    resource: "energy",
    row: 0,

    baseResource: "points",
    baseAmount() { return player.points },

    requires: new Decimal(2),
    type: "normal",
    exponent: 0.5,

    gainMult() {
        return player.e.energyMult;
    },
    gainExp() {
        return new Decimal(1);
    },

    layerShown() { return true },

    upgrades: {
        11: {
            title: "Energy Boost",
            description: "Increase energy capacity by 50.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(50);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + ""; },
            unlocked() { return true; },
        },
        12: {
            title: "Energy Renovation",
            description: "Boost buyable effect by 200%.",
            cost: new Decimal(2),
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
            unlocked() { return hasUpgrade("e", 11); },
        },
        13: {
            title: "Energy Efficiency",
            description: "Increase energy multiplier by 1.",
            cost: new Decimal(3),
            effect() {
                return new Decimal(1);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + ""; },
        },
        21: {
            title: "Energy Capacity Upgrade",
            description: "Increase energy capacity by 100.",
            cost: new Decimal(4),
            effect() {
                return new Decimal(100);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + ""; },
        },
        22: {
            title: "Energy Boost",
            description: "Boost buyable effect by 200%.",
            cost: new Decimal(5),
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        23: {
            title: "Cost Reduction",
            description: "Reduce buyable cost by 10%.",
            cost: new Decimal(6),
            effect() {
                return new Decimal(0.9);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        31: {
            title: "Multiplier Boost",
            description: "Increase energy multiplier by 2.",
            cost: new Decimal(7),
            effect() {
                return new Decimal(2);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + ""; },
        },
        32: {
            title: "Additional Capacity",
            description: "Increase energy capacity by 150.",
            cost: new Decimal(8),
            effect() {
                return new Decimal(150);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + ""; },
        },
        33: {
            title: "Buyable Efficiency",
            description: "Increase buyable effect by 300%.",
            cost: new Decimal(9),
            effect() {
                return new Decimal(3);
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
    },
});

addBuyable("e", {
    title: "Energy Capacitor",
    cost() {
        let baseCost = new Decimal(10);
        let multiplier = new Decimal(1).div(upgradeEffect("e", 23)).times(upgradeEffect("e", 33));
        return baseCost.times(multiplier).floor();
    },
    effect() {
        return new Decimal(1).add(player.e.points).div(100);
    },
    effectDisplay() {
        return format(this.effect()) + "x";
    },
    buy() {
        player.e.points = player.e.points.sub(this.cost());
        player.e.energyCap = player.e.energyCap.add(this.effect());
    },
});
