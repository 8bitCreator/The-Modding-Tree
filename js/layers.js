addLayer("p", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        };
    },

    color: "#A76D47", // Earthy brown color representing stone and nature
    resource: "primitive points", // Updated resource name to reflect the Paleolithic theme
    row: 0,

    baseResource: "points",
    baseAmount() { return player.points },

    requires: new Decimal(10),

    type: "normal",
    exponent: 0.5,

    gainMult() {
        return new Decimal(1);
    },
    gainExp() {
        return new Decimal(1);
    },

    layerShown() { return true },

    upgrades: {
        11: {
            title: "Stone Tools",
            description: "Increase primitive point gain by 10%",
            cost: new Decimal(5),
            effect() {
                return new Decimal(1.1);
            },
            effectDescription() {
                return "Primitive point gain is increased by " + format(this.effect()) + "x.";
            }
        },
        12: {
            title: "Fire Discovery",
            description: "Increase primitive point gain by 25%",
            cost: new Decimal(10),
            effect() {
                return new Decimal(1.25);
            },
            effectDescription() {
                return "Primitive point gain is increased by " + format(this.effect()) + "x.";
            }
        }
    },
});
