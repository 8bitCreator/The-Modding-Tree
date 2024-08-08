addLayer("f", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0), // Fire points
        };
    },

    color: "#FF4500", // Bright orange color representing fire
    resource: "fire points", // Resource name reflecting fire
    row: 1, // Place it below the primitive points layer

    baseResource: "primitive points", // Fire points are generated based on primitive points
    baseAmount() { return player.p.points }, // Base resource is primitive points

    requires: new Decimal(50), // Amount of primitive points required to unlock this layer
    type: "none",
    exponent: 0.5, // Base exponent for calculating fire points gain

    gainMult() {
        let mult = new Decimal(1); // Start with a base multiplier of 1

        // Check if upgrades are purchased and apply their effects
        
        return mult; // Return the total multiplier
    },

    gainExp() {
        let exp = new Decimal(1); // Start with a base exponent of 1
        return exp; // Return the total exponent
    },
    update(diff) {
        // Passive generation of fire points
        let mult = this.gainMult()
            if (hasUpgrade("f", 11)) 
            mult = mult.mul(upgradeEffect("f", 11)); // Apply effect of "Gathering Kindling"

        if (hasUpgrade("f", 12)) 
            mult = mult.mul(upgradeEffect("f", 12)); // Apply effect of "Flint Sparks"

        if (hasUpgrade("f", 13)) 
            mult = mult.mul(upgradeEffect("f", 13)); // Apply effect of "Tribal Bonfire"

; // Get the multiplier for fire points
        player.f.points = player.f.points.add(mult.times(diff)); // Add fire points over time
    },

    layerShown() { return player.p.points.gte(50) }, // Only show if you have enough primitive points

   

    upgrades: {
        11: {
            title: "Gathering Kindling",
            description: "Increase passive fire points generation by 10%.",
            cost: new Decimal(10), // Cost in fire points
            effect() {
                return new Decimal(1.1); // Increase passive generation by 10%
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },

        12: {
            title: "Flint Sparks",
            description: "Boost passive fire points generation by 20%.",
            cost: new Decimal(20),
            effect() {
                return new Decimal(1.2); // Boost generation by 20%
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },

        13: {
            title: "Tribal Bonfire",
            description: "Doubles the passive fire points generation.",
            cost: new Decimal(50),
            effect() {
                return new Decimal(2); // Double passive generation
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
    },

    effect() {
        return player[this.layer].points.add(1).log(5); // Knowledge boost based on log base 5 of fire points
    },

    effectDescription() {
        return "which increases knowledge by " + format(this.effect()) + "x based on your fire points.";
    },
});
