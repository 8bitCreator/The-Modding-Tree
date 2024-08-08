addLayer("p", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        };
    },

    color: "#A76D47", // Earthy brown color representing stone and nature
    resource: "primitive points", // Resource name reflecting the Paleolithic theme
    row: 0,

    baseResource: "points",
    baseAmount() { return player.points },

    requires: new Decimal(10),

    type: "normal",
    exponent: 0.5, // Base exponent for calculating primitive points gain

    gainMult() {
        let mult = new Decimal(1); // Start with a base multiplier of 1

        // Check if the upgrades are purchased and apply their effects
        if (hasUpgrade("p", 11)) {
            mult = mult.mul(upgradeEffect("p", 11)); // Apply effect of Stone Tools
        }
        if (hasUpgrade("p", 12)) {
            mult = mult.mul(upgradeEffect("p", 12)); // Apply effect of Fire Discovery
        }

        return mult; // Return the total multiplier
    },

    gainExp() {
        let exp = new Decimal(1); // Start with a base exponent of 1
        return exp; // Return the total exponent
    },

    layerShown() { return true },

    upgrades: {
        11: {
            title: "Stone Tools",
            description: "Boost Primitive points by ",
            cost: new Decimal(5),
            effect() {
                let eff = new Decimal(2);
                if (hasUpgrade("p", 12)) eff = eff.mul(upgradeEffect("p", 12));
                return eff; // Effect value for this upgrade 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },

        12: {
            title: "Fire Discovery",
            description: "Increase primitive points and last upgrade effect gain by ",
            cost: new Decimal(10),
            effect() {
                let eff = new Decimal(2);
                return eff; // Effect value for this upgrade
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
    },

    buyables: {
        11: {
            title: "Power of the Ancients",
            description: "Increase your primitive points by 5x each time you buy this. Cost is 10^x.",
            cost(x) { return new Decimal(10).pow(x); }, // Cost is 10^x
            effect() { return new Decimal(5); }, // Each buy increases points by 5x
            display() {
                return "Current Amount: " + getBuyableAmount(this.layer, this.id) + 
                       "<br>Cost: " + format(this.cost(getBuyableAmount(this.layer, this.id).add(1))) + 
                       " primitive points<br>" +
                       "Effect: " + format(this.effect()) + "x primitive points";
            },
            canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id).add(1))); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount(this.layer, this.id).add(1)));
                addBuyables(this.layer, this.id, 1); // Increase the amount owned by 1
            },
        },
    },
});
