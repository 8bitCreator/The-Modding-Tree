addLayer("b", {
    name: "Big Bang", 
    symbol: "B", 
    position: 0, 
    startData() { 
        return { unlocked: true, points: new Decimal(0) }; 
    },
    color: "#1D1E33",
    requires: new Decimal(10), 
    resource: "Singularity Points", 
    baseResource: "matter", 
    baseAmount() { return player.points; }, 
    type: "normal", 
    exponent: 1, // Change this to a larger number for scaling
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
        return mult;
    },
    gainExp() { 
        return new Decimal(1); 
    },
    row: 0,
    hotkeys: [
        { key: "p", description: "P: Reset for prestige points", onPress() { if (canReset(this.layer)) doReset(this.layer); } },
    ],
    layerShown() { return true; }, // Consider adding conditions here if needed
    upgrades: {
        11: {
            title: "Universal Beginning",
            description: "Boosts Matter generation by ",
            cost: new Decimal(1),
            effect() { 
                let eff = new Decimal(2); 
                if (hasUpgrade("b", 31)) {
                    eff = eff.mul(upgradeEffect("b", 31)); 
                }
                return eff; 
            },
            effectDisplay() { return format(this.effect()) + "x"; },
        },
        12: {
            title: "Quantum Fluctuation",
            description: "Boosts Matter generation based on current Singularity points by",
            cost: new Decimal(3),
            effect() {
                let eff = player.b.points.add(1).pow(0.3);
                if (hasUpgrade("b", 32)) {
                    eff = eff.mul(upgradeEffect("b", 32));
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
                    eff = eff.mul(upgradeEffect("b", 33)); 
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
            cost: new Decimal(50),
            effect() {
                return new Decimal(2); 
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            unlocked() { return hasUpgrade("b", 22); },
        },
        31: {
            title: "Upgrade Mastery",
            description: "Shows amount of Upgrade bought in this layer and boosts the first upgrade by",
            cost: new Decimal(100),
            effect() {
                return player.v.upgrades.length; 
            },
            effectDisplay() { 
                return "^" + format(this.effect()); 
            },
            unlocked() { return hasUpgrade("b", 23); },
        },
        32: {
            title: "Upgrade Mastery Pt2",
            description: "Make Upgrade Mastery boost Quantum Fluctuation with a reduced effect.",
            cost: new Decimal(150),
            effect() {
                return upgradeEffect("b", 31).pow(0.5); 
            },
            effectDisplay() { 
                return "^" + format(this.effect()); 
            },
            unlocked() { return hasUpgrade("b", 31); },
        },
        33: {
            title: "Upgrade Mastery Pt3",
            description: "Make Upgrade Mastery boost Quantum Fluctuation with a stronger reduced effect.",
            cost: new Decimal(150),
            effect() {
                return upgradeEffect("b", 31).pow(0.25); 
            },
            effectDisplay() { 
                return "^" + format(this.effect()); 
            },
            unlocked() { return hasUpgrade("b", 32); },
        },
    }
});
