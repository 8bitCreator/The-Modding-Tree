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
         if (player.e.unlocked) { // Check if the Early Universe layer is unlocked
        mult = mult.mul(tmp.e.effect); // Multiply by the effect from Early Universe
    }
        return mult;
    },
    gainExp() {
        return new Decimal(1);
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    layerShown() { return true },
     milestones: {
        0: {
            requirementDescription: "Reach 1e6 Singularity Points", // Requirement to unlock
            effectDescription: "Unlock the Early Universe layer", // Effect when unlocked
            done() { return player.b.points.gte(1e6) }, // Check if requirement is met
            unlocked() { return true }, // Always unlocked once conditions are met
        },
    },
    upgrades: {
        11: {
            title: "Universal Beginning",
            description: "Boosts Matter generation by ",
            cost: new Decimal(1),
            effect() { 
                let eff = new Decimal(2); // Base effect is 2
                if (hasUpgrade("b", 31)) {
                    let upgrade31Effect = upgradeEffect("b", 31);
                    if (upgrade31Effect.gt(0)) {
                        eff = eff.pow(upgrade31Effect);
                    }
                }
                return eff; 
            },
            effectDisplay() { return format(this.effect()) + "x"; },
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
                return eff;
            },
            effectDisplay() { 
                return "^" + format(this.effect());
            },
            unlocked() { return hasUpgrade("b", 31); },
        },
        33: {
            title: "Upgrade Mastery Pt3",
            description: "Make Upgrade Mastery boost Quantum Fluctuation with a stronger reduced effect",
            cost: new Decimal(100),
            effect() {
                let eff = upgradeEffect("b", 31).pow(0.15);
                return eff;
            },
            effectDisplay() { 
                return "^" + format(this.effect());
            },
            unlocked() { return hasUpgrade("b", 32); },
        },
    }
});
