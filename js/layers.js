addLayer("b", {
    name: "Big Bang",
    symbol: "B",
    position: 0,
    startData() { 
        return { 
            unlocked: true, 
            points: new Decimal(0),  // Singularity Energy
            quarks: new Decimal(0),
            protons: new Decimal(0),
            neutrons: new Decimal(0),
            atoms: new Decimal(0),
            stars: new Decimal(0),
            galaxies: new Decimal(0),
        }
    },
    color: "#FF5733",
    requires: new Decimal(10), // Initial requirement for generating Quarks
    resource: "Singularity Energy", // Name of the main resource
    baseResource: "Energy", // Base resource, replace with your base layer if needed
    baseAmount() { return player.points }, // How much energy you have
    type: "normal", 
    exponent: 0.5, 
    gainMult() { 
        let mult = new Decimal(1);
        // Apply upgrade multipliers if any
        if (hasUpgrade("b", 11)) mult = mult.mul(upgradeEffect("b", 11));
        if (hasUpgrade("b", 12)) mult = mult.mul(upgradeEffect("b", 12));
        if (hasUpgrade("b", 21)) mult = mult.mul(upgradeEffect("b", 21));
        if (hasUpgrade("b", 31)) mult = mult.mul(upgradeEffect("b", 31));
        if (hasUpgrade("b", 31)) mult = mult.mul(upgradeEffect("b", 32));
        if (hasUpgrade("b", 41)) mult = mult.mul(upgradeEffect("b", 41));
        return mult;
    },
    gainExp() { 
        return new Decimal(1); 
    },
    row: 0, 
    hotkeys: [
        {key: "b", description: "B: Reset for Singularity Energy", onPress(){ if (canReset(this.layer)) doReset(this.layer) }},
    ],
    upgrades: {
        11: {
            title: "Quark Production",
            description: "Boost Singularity Energy gain based on Quarks.",
            cost: new Decimal(1),
            effect() {
                return player.b.quarks.add(1).pow(0.5); 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        12: {
            title: "Proton Formation",
            description: "Boost Singularity Energy gain based on Protons.",
            cost: new Decimal(10),
            effect() {
                return player.b.protons.add(1).pow(0.3); 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        21: {
            title: "Neutron Fusion",
            description: "Boost Singularity Energy gain based on Neutrons.",
            cost: new Decimal(100),
            effect() {
                return player.b.neutrons.add(1).pow(0.2); 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        31: {
            title: "Atomic Synthesis",
            description: "Boost Singularity Energy gain based on Atoms.",
            cost: new Decimal(1000),
            effect() {
                return player.b.atoms.add(1).pow(0.1); 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        32: {
            title: "Stellar Formation",
            description: "Boost Singularity Energy gain based on Stars.",
            cost: new Decimal(10000),
            effect() {
                return player.b.stars.add(1).pow(0.05); 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
        41: {
            title: "Galactic Expansion",
            description: "Boost Singularity Energy gain based on Galaxies.",
            cost: new Decimal(100000),
            effect() {
                return player.b.galaxies.add(1).pow(0.025); 
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x"; },
        },
    },
    buyables: {
        11: {
            title: "Quark Generators",
            cost(x) { return new Decimal(10).pow(x.add(1)); },
            effect(x) { return x.add(1).pow(1.25); },
            display() { 
                return "Increase quark generation.\n" + 
                "Currently: " + format(this.effect()) + "x\n" + 
                "Cost for next level: " + format(this.cost()) + " Singularity Energy"; 
            },
            canAfford() { return player.b.points.gte(this.cost()) },
            buy() {
                player.b.points = player.b.points.sub(this.cost());
                player.b.buyables[this.id] = player.b.buyables[this.id].add(1);
            },
            unlocked() { return hasMilestone("b", 0) },  // Unlock after 1st milestone
        },
        12: {
            title: "Proton Generators",
            cost(x) { return new Decimal(100).pow(x.add(1)); },
            effect(x) { return x.add(1).pow(1.15); },
            display() { 
                return "Increase proton generation.\n" + 
                "Currently: " + format(this.effect()) + "x\n" + 
                "Cost for next level: " + format(this.cost()) + " Quarks"; 
            },
            canAfford() { return player.b.quarks.gte(this.cost()) },
            buy() {
                player.b.quarks = player.b.quarks.sub(this.cost());
                player.b.buyables[this.id] = player.b.buyables[this.id].add(1);
            },
            unlocked() { return hasMilestone("b", 1) },  // Unlock after 2nd milestone
        },
        13: {
            title: "Neutron Generators",
            cost(x) { return new Decimal(100).pow(x.add(1)); },
            effect(x) { return x.add(1).pow(1.15); },
            display() { 
                return "Increase neutron generation.\n" + 
                "Currently: " + format(this.effect()) + "x\n" + 
                "Cost for next level: " + format(this.cost()) + " Quarks"; 
            },
            canAfford() { return player.b.quarks.gte(this.cost()) },
            buy() {
                player.b.quarks = player.b.quarks.sub(this.cost());
                player.b.buyables[this.id] = player.b.buyables[this.id].add(1);
            },
            unlocked() { return hasMilestone("b", 1) },  // Unlock after 2nd milestone
        },
        21: {
            title: "Atom Generators",
            cost(x) { return new Decimal(1000).pow(x.add(1)); },
            effect(x) { return x.add(1).pow(1.1); },
            display() { 
                return "Increase atom generation.\n" + 
                "Currently: " + format(this.effect()) + "x\n" + 
                "Cost for next level: " + format(this.cost()) + " Protons"; 
            },
            canAfford() { return player.b.protons.gte(this.cost()) },
            buy() {
                player.b.protons = player.b.protons.sub(this.cost());
                player.b.buyables[this.id] = player.b.buyables[this.id].add(1);
            },
            unlocked() { return hasMilestone("b", 2) },  // Unlock after 3rd milestone
        },
        22: {
            title: "Star Generators",
            cost(x) { return new Decimal(10000).pow(x.add(1)); },
            effect(x) { return x.add(1).pow(1.05); },
            display() { 
                return "Increase star generation.\n" + 
                "Currently: " + format(this.effect()) + "x\n" + 
                "Cost for next level: " + format(this.cost()) + " Atoms"; 
            },
            canAfford() { return player.b.atoms.gte(this.cost()) },
            buy() {
                player.b.atoms = player.b.atoms.sub(this.cost());
                player.b.buyables[this.id] = player.b.buyables[this.id].add(1);
            },
            unlocked() { return hasMilestone("b", 2) },  // Unlock after 3rd milestone
        },
        23: {
            title: "Galaxy Generators",
            cost(x) { return new Decimal(100000).pow(x.add(1)); },
            effect(x) { return x.add(1).pow(1.025); },
            display() { 
                return "Increase galaxy generation.\n" + 
                "Currently: " + format(this.effect()) + "x\n" + 
                "Cost for next level: " + format(this.cost()) + " Stars"; 
            },
            canAfford() { return player.b.stars.gte(this.cost()) },
            buy() {
                player.b.stars = player.b.stars.sub(this.cost());
                player.b.buyables[this.id] = player.b.buyables[this.id].add(1);
            },
            unlocked() { return hasMilestone("b", 3) },  // Unlock after 4th milestone
        },
    },
    milestones: {
        0: {
            requirementDescription: "Reach 1,000 Singularity Energy",
            effectDescription: "Unlock Quark Generators.",
            done() { return player.b.points.gte(1000) },
        },
        1: {
            requirementDescription: "Reach 10,000 Quarks",
            effectDescription: "Unlock Proton and Neutron Generators.",
            done() { return player.b.quarks.gte(10000) },
        },
        2: {
            requirementDescription: "Reach 100,000 Protons and Neutrons",
            effectDescription: "Unlock Atom and Star Generators.",
            done() { return player.b.protons.gte(100000) && player.b.neutrons.gte(100000) },
        },
        3: {
            requirementDescription: "Reach 1,000,000 Atoms",
            effectDescription: "Unlock Galaxy Generators.",
            done() { return player.b.atoms.gte(1000000) },
        },
    },
    update(diff) {
        // Quark Generation
        let quarkGain = new Decimal(0);
        if (hasBuyable("b", 11)) quarkGain = quarkGain.add(buyableEffect("b", 11));
        player.b.quarks = player.b.quarks.add(quarkGain.mul(diff));

        // Proton Generation
        let protonGain = new Decimal(0);
        if (hasBuyable("b", 12)) protonGain = protonGain.add(buyableEffect("b", 12));
        player.b.protons = player.b.protons.add(protonGain.mul(diff));

        // Neutron Generation
        let neutronGain = new Decimal(0);
        if (hasBuyable("b", 13)) neutronGain = neutronGain.add(buyableEffect("b", 13));
        player.b.neutrons = player.b.neutrons.add(neutronGain.mul(diff));

        // Atom Generation
        let atomGain = new Decimal(0);
        if (hasBuyable("b", 21)) atomGain = atomGain.add(buyableEffect("b", 21));
        player.b.atoms = player.b.atoms.add(atomGain.mul(diff));

        // Star Generation
        let starGain = new Decimal(0);
        if (hasBuyable("b", 22)) starGain = starGain.add(buyableEffect("b", 22));
        player.b.stars = player.b.stars.add(starGain.mul(diff));

        // Galaxy Generation
        let galaxyGain = new Decimal(0);
        if (hasBuyable("b", 23)) galaxyGain = galaxyGain.add(buyableEffect("b", 23));
        player.b.galaxies = player.b.galaxies.add(galaxyGain.mul(diff));
    },
    passiveGeneration() { 
        return hasUpgrade("b", 41) ? 1 : 0; 
    },
});
