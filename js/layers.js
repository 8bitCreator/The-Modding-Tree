addLayer("p", {
    name: "Prehistoric Era", // Optional name
    symbol: "P", // Text on the node
    position: 0, // Horizontal position within a row
    startData() { return {
        unlocked: true, // The layer is unlocked by default
        points: new Decimal(0), // The main currency for this layer
    }},
    color: "#8B4513",
    requires: new Decimal(10), // Cost to unlock prestige points
    resource: "insights", // Name of prestige currency
    baseResource: "points", // Name of resource prestige gain is based on
    baseAmount() { return player.points }, // Current amount of baseResource
    type: "normal", // Prestige type
    exponent: 0.5, // Prestige exponent
    gainMult() { // Prestige gain multiplier
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Prestige gain exponent
        return new Decimal(1)
    },
    row: 0, // Row in the tree
    hotkeys: [
        {key: "p", description: "P: Reset for insights", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return true }, // Layer visibility in the tree

    upgrades: {
        11: {
            title: "Basic Tools",
            description: "Increase point generation by 2x.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(2)
            },
            unlocked() { return true }, // Upgrade is available from the start
        },
        12: {
            title: "Fire Discovery",
            description: "Increase point generation by another 2x.",
            cost: new Decimal(2),
            effect() {
                return new Decimal(2)
            },
            unlocked() { return hasUpgrade("p", 11) }, // Requires Basic Tools upgrade
        },
    },

    milestones: {
        0: {
            requirementDescription: "1 Insight",
            effectDescription: "Keep Basic Tools upgrade on reset.",
            done() { return player.p.points.gte(1) },
        },
        1: {
            requirementDescription: "5 Insights",
            effectDescription: "Keep Fire Discovery upgrade on reset.",
            done() { return player.p.points.gte(5) },
        },
    },

    achievements: {
        11: {
            name: "First Tool",
            done() { return hasUpgrade("p", 11) },
            tooltip: "Unlock the Basic Tools upgrade.",
        },
        12: {
            name: "Master of Fire",
            done() { return hasUpgrade("p", 12) },
            tooltip: "Unlock the Fire Discovery upgrade.",
        },
    },

    infoboxes: {
        story: {
            title: "Prehistoric Era",
            body: "In the prehistoric era, humanity's earliest ancestors began their journey towards survival and innovation. They discovered basic tools and fire, laying the foundation for future advancements.",
        },
    },

    doReset(resettingLayer) {
        let gain = this.getResetGain();
        if (gain.gt(0)) {
            player[this.layer].points = player[this.layer].points.add(gain);
        }
        let keep = [];
        if (hasMilestone("p", 0)) keep.push("upgrades");
        layerDataReset(this.layer, keep);
    },

    getResetGain() {
        let base = this.baseAmount().div(this.requires).pow(this.exponent);
        return base.times(this.gainMult()).pow(this.gainExp());
    },

    canReset() {
        return this.baseAmount().gte(this.requires);
    },
});
