addLayer("b", {
    name: "The Big Bang",
    symbol: "💥",
    position: 0,
    startData() { return { 
        unlocked: true, 
        points: new Decimal(0), 
        quarks: new Decimal(0),
        buyables: {
            11: new Decimal(0), // Initialize Quark Generators
        },
    }},
    color: "#FF4500",
    requires: new Decimal(10),
    resource: "Energy",
    baseResource: "Matter",
    baseAmount() { return player.points },
    type: "normal",
    exponent: 0.5,
    gainMult() { 
    let mult = new Decimal(1);
    
    // Apply all relevant upgrade boosts
    if (hasUpgrade("b", 11)) mult = mult.mul(upgradeEffect("b", 11)); // Quark Production boost
    if (hasUpgrade("b", 12)) mult = mult.mul(upgradeEffect("b", 12)); // Energy Synthesis boost
    if (hasUpgrade("b", 14)) mult = mult.mul(upgradeEffect("b", 14)); // Quark Fusion boost
    if (hasUpgrade("b", 21)) mult = mult.mul(upgradeEffect("b", 21)); // Cosmic Expansion boost
    if (hasUpgrade("b", 22)) mult = mult.mul(upgradeEffect("b", 22)); // Dark Matter boost
    if (hasUpgrade("b", 24)) mult = mult.mul(upgradeEffect("b", 24)); // Singularity boost
    if (hasUpgrade("b", 31)) mult = mult.mul(upgradeEffect("b", 31)); // Final Expansion boost
    
    return mult;
},

    gainExp() { return new Decimal(1) },
    layerShown() { return true },

    upgrades: {
        11: {
            title: "Quantum Fluctuations",
            description: "Boost Energy production.",
            cost: new Decimal(5),
            effect() { return new Decimal(2) },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
        },
        12: {
            title: "Inflation",
            description: "Greatly increase Energy gain.",
            cost: new Decimal(20),
            effect() { return new Decimal(5) },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 11) },
        },
        13: {
            title: "Particle Generation",
            description: "Unlocks the ability to generate Quarks.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("b", 12) },
        },
        14: {
            title: "Quark Fusion",
            description: "Quarks boost Energy production.",
            cost: new Decimal(100),
            effect() { return player.b.quarks.add(1).pow(0.5); },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 13) },
        },
        21: {
            title: "Cosmic Expansion",
            description: "Further boost Energy production.",
            cost: new Decimal(200),
            effect() { return player.b.points.add(1).pow(0.25); },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 14) },
        },
        22: {
            title: "Dark Matter",
            description: "Energy gain is multiplied based on total Quarks.",
            cost: new Decimal(500),
            effect() { return player.b.quarks.add(1).pow(0.2); },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 21) },
        },
        23: {
            title: "Antimatter",
            description: "Double Quark generation.",
            cost: new Decimal(1000),
            effect() { return new Decimal(2); },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 22) },
        },
        24: {
            title: "Singularity",
            description: "Significantly boost Energy production.",
            cost: new Decimal(2500),
            effect() { return new Decimal(10); },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 23) },
        },
        31: {
            title: "Final Expansion",
            description: "Unlock the ultimate boost to Energy production.",
            cost: new Decimal(5000),
            effect() { return player.b.points.add(1).pow(0.5); },
            effectDisplay() { return format(this.effect()) + "x" }, // Show effect
            unlocked() { return hasUpgrade("b", 24) },
        },
    },

    buyables: {
        11: {
            title: "Quark Generator",
            cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); },
            effect(x) { 
                let baseEffect = x.add(1).pow(0.5);
                if (hasUpgrade("b", 23)) baseEffect = baseEffect.mul(upgradeEffect("b", 23)); // Antimatter boost
                return baseEffect; 
            },
            display() {
                return `Generate more Quarks. Currently: ${format(player.b.buyables[11])} Quark Generators.<br>
                        Each generator produces ${format(this.effect())} Quarks per second.<br>
                        Cost for next: ${format(this.cost(player.b.buyables[11]))} Energy.`;
            },
            canAfford() { return player.b.points.gte(this.cost()) },
            buy() {
                player.b.points = player.b.points.sub(this.cost());
                player.b.buyables[11] = player.b.buyables[11].add(1);
            },
            effectDisplay() { return format(this.effect()) + "x"; },
            style: { 'background-color': '#FF6347', 'color': '#FFFFFF' },
            unlocked() { return hasUpgrade("b", 13) }, // Unlocks the buyable when upgrade 13 is obtained
        },
    },

    update(diff) {
        if (hasUpgrade("b", 13)) {
            let quarkGain = player.b.buyables[11].mul(diff);
            player.b.quarks = player.b.quarks.add(quarkGain);
        }
    },

    passiveGeneration() { return 1 }, // 100% of energy per second if upgrade 11 is obtained

    display() {
        let displayText = `You have ${format(player.b.quarks)} Quarks.`;
        if (hasUpgrade("b", 13)) {
            displayText += `<br>Quarks are generated by Quark Generators.`;
        }
        return displayText;
    },
});
