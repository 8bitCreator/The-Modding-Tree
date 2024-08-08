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
            title: "Hunting",
            description: "increases primitive points and last upgrade effect gain by ",
            cost: new Decimal(25),
            effect() {
                let eff = new Decimal(2);
                return eff; // Effect value for this upgrade
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
         13: {
            title: "Primitive Mind",
            description: "increases knowledge by 2",
            cost: new Decimal(300),
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
            description: "Increases knowledge by 5x each time you buy this. Cost is 10^x.",
            cost(x) { return new Decimal(10).pow(x); }, // Cost is 10^x
            effect(x) { return new Decimal(5).pow(x); }, // Each buy increases points by 5^x
            display() {
                const amount = getBuyableAmount(this.layer, this.id);
                return "Current Amount: " + amount + 
                       "<br>Cost: " + format(this.cost(amount.add(1))) + 
                       " knowledge<br>" +
                       "Effect: " + format(this.effect(amount)) + "x primitive points"; // Use effect based on amount
            },
            canAfford() { return player[this.layer].points.gte(this.cost(getBuyableAmount(this.layer, this.id).add(1))); },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost(getBuyableAmount(this.layer, this.id).add(1)));
                addBuyables(this.layer, this.id, 1); // Increase the amount owned by 1
            },
        },
    },
     milestones: {
        11: {
            requirementDescription: "1000 Primitive Points",
            effectDescription: "Unlocks the Fire layer.",
            done() { return player.p.points.gte(1000); }, // The milestone is achieved when you have 10 primitive points
        },
    },
});
