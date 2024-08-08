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

        // You can check for additional upgrades affecting the exponent here if needed

        return exp; // Return the total exponent
    },

    layerShown() { return true },

    upgrades: {
        11: {
            title: "Stone Tools",
            description: "Increase primitive point gain by a factor of 2.",
            cost: new Decimal(5),
            effect() {
                return new Decimal(2); // Effect value for this upgrade
            },
            effectDescription() {
                return "Primitive point gain is doubled.";
            }
        },
        12: {
            title: "Fire Discovery",
            description: "Increase primitive point gain by a factor of 2.",
            cost: new Decimal(10),
            effect() {
                return new Decimal(2); // Effect value for this upgrade
            },
            effectDescription() {
                return "Primitive point gain is doubled.";
            }
        }
    },
});
