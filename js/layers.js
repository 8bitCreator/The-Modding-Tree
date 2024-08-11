addLayer("r", {
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0)  // Track rank points
        };
    },

    color: "#808080", // Set color to grey for the first layer
    resource: "rank points",     // Main currency for this layer
    row: 1,

    baseResource: "points",      // Resource for prestige
    baseAmount() { return player.points },

    // Requirements for gaining rank points will be based on a formula
    requires() {
        let rankLevel = player[this.layer].points.add(1).pow(1.5).floor(); // Use current rank points to determine requirement
        return new Decimal(10).mul(rankLevel); // Multiply by base of 10
    },

    type: "static",  // Set layer type to static
    base: 10,        // Base for the static layer
    exponent: 1,     // Exponent for the formula

    roundUpCost: true, // Round up the cost if needed

    gainMult() {
        let mult = new Decimal(1);
        if (hasMilestone("r", 11)) mult = mult.mul(2); // Milestone 11 (2x points)
        if (hasMilestone("r", 12)) mult = mult.mul(3); // Milestone 12 (3x points)
        return mult;
    },

    gainExp() {
        return new Decimal(1);
    },

    layerShown() { return true },

    milestones: {
        11: {
            requirementDescription: "Reach 1 rank point", // Requirement for milestone 11
            effectDescription: "2x points", // Effect description for milestone 11
            done() { return player[this.layer].points.gte(1) } // Condition to check if milestone is reached
        },
        12: {
            requirementDescription: "Reach 2 rank points", // Requirement for milestone 12
            effectDescription: "3x points", // Effect description for milestone 12
            done() { return player[this.layer].points.gte(2) } // Condition to check if milestone is reached
        },
        13: {
            requirementDescription: "Reach 3 rank points", // Requirement for milestone 13
            effectDescription: "Unlocks the tier layer", // Effect description for milestone 13
            done() { return player[this.layer].points.gte(3) }, // Condition to check if milestone is reached
            onComplete() { 
                player.t.unlocked = true; // Unlock the tier layer when milestone 13 is reached
            }
        }
    },

    milestonePopups: true // Enable milestone popups if desired
});
