addLayer("b", {
    name: "Big Bang",
    symbol: "B",
    position: 0,
    startData() { 
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#1D1E33",
    requires: new Decimal(10),
    resource: "Singularity Points",
    baseResource: "matter",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("b", 13)) {
            mult = mult.mul(upgradeEffect("b", 13));
        }
        if (hasUpgrade("b", 22)) {
            mult = mult.mul(upgradeEffect("b", 22));
        }
        if (hasUpgrade("b", 23)) {
            mult = mult.mul(upgradeEffect("b", 23));
        }      
         if (hasUpgrade("e", 11)) { // Check if the Early Universe layer is unlocked
        mult = mult.mul(tmp.e.effect); // Multiply by the effect from Early Universe
    }
         if (hasUpgrade("e", 12)) {
            mult = mult.mul(upgradeEffect("e", 12));
        }      
        if (hasUpgrade("b", 14)) {
            mult = mult.pow(upgradeEffect("b", 14));
        }      
        if (player.b.challengeCompleted) {
                mult = mult.mul(10); // Increase effect by 50% as a reward
            }
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 0,
    hotkeys: [
        {key: "b", description: "B: Reset for prestige points", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
  

     milestones: {
        0: {
            requirementDescription: "Reach 5e5 Singularity Points", // Requirement to unlock
            effectDescription: "Unlock the Early Universe layer", // Effect when unlocked
            done() { return player.b.points.gte(5e5) || player.e.unlocked }, // Check if requirement is met
            unlocked() { return true }, // Always unlocked once conditions are met
        },
    },
    upgrades: {
     11: {
        title: "Universal Beginning",
        description: "Boosts Matter generation by",
        cost: new Decimal(1),
        effect() { 
    let baseEff = new Decimal(2); // Base effect is 2

    // Add the effect of Upgrade 13 from the other layer (layer e)
    if (hasUpgrade("e", 13)) {
        let upgrade13Effect = upgradeEffect("e", 13);
        baseEff = baseEff.add(upgrade13Effect);
    }

    // Add the effect of Dark Matter before applying Upgrade 31's power
    if (player.d.unlocked) {
        let darkMatterEffect = tmp.d.effect; // Assuming tmp.d.effect is the Dark Matter effect
        baseEff = baseEff.add(darkMatterEffect);
    }

    // Apply Upgrade 31's effect if it exists
    if (hasUpgrade("b", 31)) {
        let upgrade31Effect = upgradeEffect("b", 31);
        if (upgrade31Effect.gt(0)) {
            baseEff = baseEff.pow(upgrade31Effect);
        }
    }

    return baseEff; 
},

        effectDisplay() { return format(this.effect()) + "x"; }, // Displays the current effect
    },
        12: {
            title: "Quantum Fluctuation",
            description: "Boosts Matter generation based on current Singularity Points by",
            cost: new Decimal(3),
            effect() {
                let eff = player.b.points.add(1).pow(0.3);
                if (hasUpgrade("b", 32)) {
                    let upgrade32Effect = upgradeEffect("b", 32);
                    if (upgrade32Effect.gt(0)) {
                        eff = eff.pow(upgrade32Effect);
                    }
                }
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 11); },
        },
        13: {
            title: "Singularity Expansion",
            description: "Boosts Singularity Points generation based on current Singularity Points by",
            cost: new Decimal(5),
            effect() {
                let eff = player.b.points.add(1).pow(0.1);
                if (hasUpgrade("b", 33)) {
                    let upgrade33Effect = upgradeEffect("b", 33);
                    if (upgrade33Effect.gt(0)) {
                        eff = eff.pow(upgrade33Effect);
                    }
                }
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 12); },
        },
        21: {
            title: "Matter Amplification",
            description: "Boosts Matter generation based on current Matter by",
            cost: new Decimal(10),
            effect() {
                let eff = player.points.add(1).pow(0.1);
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 13); },
        },
        22: {
            title: "Matter to Singularity",
            description: "Matter boosts Singularity Points generation by",
            cost: new Decimal(25),
            effect() {
                let eff = player.points.add(1).log10().pow(0.6);
                

                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 21); },
        },
       23: {
    title: "Cosmic Expansion", 
    description: "Boosts Singularity Points generation by",
    cost: new Decimal(30),
    effect() {
        let eff = new Decimal(2); 

        // Check and apply effect from upgrade e22
        if (hasUpgrade("e", 22)) {
            let e22Effect = upgradeEffect("e", 22);
            eff = eff.add(e22Effect);
        }

        // Apply the effect from Dark Matter if the Dark Ages layer is unlocked
        if (player.d.unlocked) {
            let darkMatterEffect = tmp.d.effect; // Assuming tmp.d.effect is the Dark Matter effect
            eff = eff.add(darkMatterEffect);
        }

        // Optional further enhancement from another upgrade (b34)
        if (hasUpgrade("b", 34)) {
            let upgrade34Effect = upgradeEffect("b", 34);
            if (upgrade34Effect.gt(0)) {
                eff = eff.pow(upgrade34Effect);
            }
        }

        return eff;
    },
    effectDisplay() { return format(this.effect()) + "x"; },
    unlocked() { return hasUpgrade("b", 22); },
},

        31: {
            title: "Upgrade Mastery",
            description: "Shows amount of Upgrade bought in this layer and boost first upgrade by",
            cost: new Decimal(50),
            effect() {
                let eff = new Decimal(player.b.upgrades.length);
                if (hasUpgrade("e", 21)) {  
                    let upgrade21eEffect = upgradeEffect("e", 21);
                    if (upgrade21eEffect.gt(0)){
                        eff = eff.pow(upgrade21eEffect);
                        }
                    }
                return eff;
            },
            effectDisplay() { 
                return "^" + format(this.effect());
            },
            unlocked() { return hasUpgrade("b", 23); },
        },
          32: {
        title: "Upgrade Mastery Pt2",
        description: "Make Upgrade Mastery boost Quantum Fluctuation with a reduced effect.",
        cost: new Decimal(75),
        effect() {
            let eff = upgradeEffect("b", 31).pow(0.25);
            
            // Disable this upgrade during the challenge
            if (player.challenging && player.d.upgradesDisabled[32]) {
                eff = new Decimal(1); // Return 1 instead of the normal effect
            }

            // Buff the effect if the challenge is completed
            if (player.d.challengeCompleted) {
                eff = eff.mul(1.25); // Increase effect by 50% as a reward
            }

            return eff;
        },
        effectDisplay() { 
            return "^" + format(this.effect());
        },
        unlocked() { return hasUpgrade("b", 31); },
    },
    33: {
        title: "Upgrade Mastery Pt3",
        description: "Make Upgrade Mastery Singularity Expansion with a stronger reduced effect.",
        cost: new Decimal(1000),
        effect() {
            let eff = upgradeEffect("b", 31).pow(0.15);
            
            // Disable this upgrade during the challenge
            if (player.challenging && player.d.upgradesDisabled[33]) {
                eff = new Decimal(1); // Return 1 instead of the normal effect
            }

            // Buff the effect if the challenge is completed
            if (player.d.challengeCompleted) {
                eff = eff.mul(1.25); // Increase effect by 50% as a reward
            }

            return eff;
        },
        effectDisplay() { 
            return "^" + format(this.effect());
        },
        unlocked() { return hasUpgrade("b", 32); },
    },
      14: {
    title: "Singularity Breaking Point",
    description: "Raise Singularity Points by current Singularity Points with a much reduced effect.",
    cost: new Decimal(1e15),
    effect() {
        // Logarithmic effect calculation with a much lower exponent
        let eff = player.b.points.add(1).log10().add(1).pow(0.05); 
        return eff;
    },
    effectDisplay() { 
        return "^" + format(this.effect());
    },
    unlocked() { return hasMilestone("e", 1); },
},
        24: {
    title: "Singularity Particle Synergy",
    description: "Boosts Subatomic Particles generation based on your current Singularity Points.",
    cost: new Decimal(1e25), // Example cost
    effect() {
        let eff = player.b.points.add(1).log10().pow(0.3); // Logarithmic scaling with reduced power
        return eff;
    },
    effectDisplay() { 
        return format(this.effect()) + "x"; // Display as a multiplier
    },
    unlocked() { return hasUpgrade("b", 14); }, // Unlocked after previous upgrade
},
  34: {
            title: "Upgrade Mastery Pt4",
            description: "Make Upgrade Mastery boost Cosmic Expansion with a way stronger reduced effect",
            cost: new Decimal(1e30),
            effect() {
                let eff = upgradeEffect("b", 31).pow(0.10);
                return eff;
            },
            effectDisplay() { 
                return "^" + format(this.effect());
            },
            unlocked() { return hasUpgrade("b", 24); },
        },
    },
    passiveGeneration() {
        // Base generation rate
        let passive = new Decimal(0); // Adjust base value as needed

        // Adjust generation based on current upgrades or player status
        if (hasMilestone("e", 1)) { // Check if the upgrade is unlocked
            passive = passive.add(1) // Apply effect of upgrade 24
        } 
        return passive 
        },

  doReset(resettingLayer) {
    if(tmp[resettingLayer].row > this.row) {
        let keepUpgrades = player["b"].upgrades;
        let keepMilestones = player["b"].milestones;  
        layerDataReset("b");
        if(hasUpgrade("e", 11)) player["b"].milestones = keepMilestones;
        if(hasMilestone("e", 0)) player["b"].upgrades = keepUpgrades;
    }
}

});
addLayer("c", {
    name: "Celestial",
    symbol: "C",
    position: 2,
    startData() { 
        return {
            unlocked: false,
            points: new Decimal(0),
            stars: new Decimal(0), // "Stars" resource
            starGenRate: new Decimal(1), // Stars generated per second
        }
    },
    color: "#ffcc00",
    requires: new Decimal(1e60), // Requirement to unlock the Celestial layer
    resource: "Celestial Energy", 
    baseResource: "Matter", 
    baseAmount() { return player.points },
    type: "normal", 
    exponent: 0.009, 
    gainMult() { 
        let mult = new Decimal(1);
        return mult;
    },
    gainExp() { return new Decimal(1) },
    row: 2, 
    hotkeys: [
        {key: "c", description: "C: Reset for Celestial Energy", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return hasMilestone("e", 2) },

    // Layer Effect
    effect() {
        let eff = player.c.points.add(1).pow(2); // New formula: (x + 1)^2
        return eff;
    },
    effectDescription() {
        return "which boosts your production by " + "^" + format(this.effect());
    },

    // Tab Structure
    tabFormat: {
        "Proto-Star": {
            content: [
                ["display-text", function() { return "You are forming the first celestial structure: a Proto-Star!" }],
                "main-display",
                ["prestige-button", "", function() { return "Form Proto-Star using Matter" }],
                "blank",
                "upgrades", // Adding upgrades section
            ],
        },
        "Galaxy Cluster": {
            unlocked() { return player.c.points.gte(10) }, // Unlock after gaining 10 Celestial Energy
            content: [
                ["display-text", function() { return "You are forming the next celestial structure: a Galaxy Cluster!" }],
                "main-display",
                ["prestige-button", "", function() { return "Form Galaxy Cluster using Celestial Energy" }],
                "blank",
            ],
        },
        "Stars": {
            unlocked() { return player.c.unlocked }, // Stars tab is unlocked as soon as the Celestial layer is unlocked
            content: [
                ["display-text", function() { return "You can now create Stars, which are essential for the formation of larger celestial structures." }],
                ["display-text", function() { 
                    return "You have " + format(player.c.stars) + " Stars."; 
                }],
                ["display-text", function() { 
                    return "Stars are generating at " + format(player.c.starGenRate) + " per second."; 
                }],
                ["resource-display", "stars"], // Display the current amount of Stars
            ],
        },
    },

    // Upgrades
    upgrades: {
        11: {
            title: "Star-Powered Matter",
            description: "Matter production is boosted based on the number of Stars you have.",
            cost: new Decimal(1),
            effect() {
                let eff = player.c.stars.add(1).pow(0.5); // Boost based on Stars
                return eff;
            },
            effectDisplay() { return "^" + format(this.effect()); },
            unlocked() { return true; }, // Always unlocked once layer is unlocked
        },
        12: {
            title: "Stellar Growth",
            description: "Increase the production of Stars.",
            cost: new Decimal(3),
            effect() {
                let eff = new Decimal(2); // Doubles Star production
                return eff;
            },
            effectDisplay() { return "x" + format(this.effect()); },
            unlocked() { return hasUpgrade("c", 11); }, // Unlock after the first upgrade
        },
        13: {
            title: "Celestial Mastery",
            description: "Boosts Celestial Energy gain based on Stars.",
            cost: new Decimal(5),
            effect() {
                let eff = player.c.stars.add(1).pow(0.3); // Boost Celestial Energy based on Stars
                return eff;
            },
            effectDisplay() { return "^" + format(this.effect()); },
            unlocked() { return hasUpgrade("c", 12); }, // Unlock after the second upgrade
        },
    },

    // Star Generation
    update(diff) {
       
            let starGenRate = player.c.starGenRate.mul(tmp.c.effect);
            

            if (hasUpgrade('c', 12)) {
                starGenRate = starGenRate.mul(upgradeEffect('c', 12));
            }

            // Multiply star generation rate by the Celestial layer effect
            

            player.c.stars = player.c.stars.add(starGenRate.mul(diff)); // Generates Stars per second
        },
    
});

