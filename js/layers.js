addLayer("e", {
    name: "Energy",                        // Layer name for reset confirmations
    startData() {
        return {
            unlocked: true,               // Layer starts unlocked
            points: new Decimal(0),       // Main resource: energy points
            capacitors: new Decimal(0),   // Track number of energy capacitors
            energyCap: new Decimal(100),   // Initial energy cap
        };
    },

    color: "#ff4500",                     // Color of the layer
    resource: "energy",                    // Name of the main currency
    row: 1,                                // Row position in the tree

    baseResource: "points",                // Resource for prestige gain
    baseAmount() { return player.points },  // Function to get current base resource amount

    requires: new Decimal(2),              // Amount needed to gain 1 energy

    type: "normal",                        // Type of prestige layer
    exponent: 0.5,                         // Exponent for energy gain

    gainMult() {                           // Gain multiplier for energy points
        let mult = new Decimal(1);
        if (hasUpgrade("e", 11)) mult = mult.mul(upgradeEffect(this.layer, 11)); // Upgrade 11 effect
        if (hasUpgrade("e", 12)) mult = mult.mul(upgradeEffect(this.layer, 12)); // Upgrade 12 effect
        if (hasUpgrade("e", 13)) mult = mult.mul(upgradeEffect(this.layer, 13)); // Upgrade 13 effect
        if (hasUpgrade("e", 31)) mult = mult.mul(upgradeEffect(this.layer, 31)); // Upgrade 31 effect
        return mult;
    },

    gainExp() {                            // Gain exponent for energy points
        return new Decimal(1);
    },

    layerShown() { return true },          // Layer is shown in the tree

    upgrades: {
        11: {
            title: "Energy Boost",         // Title of the upgrade
            description: "Increase energy gain by 50%.", // Upgrade description
            cost: new Decimal(10),         // Cost of the upgrade
            effect() {
                return new Decimal(1.5);   // Effect of the upgrade (50% increase)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            }
        },
        12: {
            title: "Energy Efficiency",     // Title of the upgrade
            description: "Increase energy gain by 20%. Available only if Energy Boost is purchased.", // Updated upgrade description
            cost: new Decimal(20),         // Cost of the upgrade
            effect() {
                return new Decimal(1.2);   // Effect of the upgrade (20% increase)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            },
            unlocked() {
                return hasUpgrade("e", 11); // Can buy if Upgrade 11 is purchased
            }
        },
        13: {
            title: "Power Surge",           // Title of the upgrade
            description: "Increase energy gain by 100%.", // Upgrade description
            cost: new Decimal(50),          // Cost of the upgrade
            effect() {
                return new Decimal(2);       // Effect of the upgrade (100% increase)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            }
        },
        21: {
            title: "Energy Storage",         // Title of the upgrade
            description: "Increase maximum energy capacity by 100.", // Upgrade description
            cost: new Decimal(100),          // Cost of the upgrade
            effect() {
                return new Decimal(100);      // Effect of the upgrade (increased capacity)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + " units"; // Display effect as an increase in capacity
            }
        },
        22: {
            title: "Enhanced Buyable Effects", // Title of the new Upgrade 22
            description: "Boost the effect of buyables by 200%.", // Upgrade description
            cost: new Decimal(200),           // Cost of the upgrade
            effect() {
                return new Decimal(3);         // Effect of the upgrade (200% increase)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            },
        },
        23: {
            title: "Efficiency Upgrade",      // Title of the upgrade
            description: "Reduces the cost of buyables by 10%.", // Upgrade description
            cost: new Decimal(300),           // Cost of the upgrade
            effect() {
                return new Decimal(0.9);       // Effect of the upgrade (cost reduction)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            }
        },
        31: {
            title: "Advanced Energy Boost",   // Title of the upgrade
            description: "Increase energy gain by 150%.", // Upgrade description
            cost: new Decimal(500),           // Cost of the upgrade
            effect() {
                return new Decimal(2.5);       // Effect of the upgrade (150% increase)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            }
        },
        32: {
            title: "Mega Energy Storage",      // Title of the upgrade
            description: "Increase maximum energy capacity by 500.", // Upgrade description
            cost: new Decimal(1000),          // Cost of the upgrade
            effect() {
                return new Decimal(500);       // Effect of the upgrade (increased capacity)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + " units"; // Display effect as an increase in capacity
            }
        },
        33: {
            title: "Ultimate Efficiency",       // Title of the upgrade
            description: "Reduces energy cost by an additional 20%.", // Upgrade description
            cost: new Decimal(2000),           // Cost of the upgrade
            effect() {
                return new Decimal(0.8);       // Effect of the upgrade (additional cost reduction)
            },
            effectDisplay() {
                return format(upgradeEffect(this.layer, this.id)) + "x"; // Display effect as a multiplier
            }
        }
    },

    buyables: {
        11: {
            title: "Energy Capacitor",        // Title of the buyable
            description: "Increase maximum energy capacity by 50.", // Description of the buyable
            cost() {
                let baseCost = new Decimal(100).mul(this.amount.add(1)); // Base cost calculation
                if (hasUpgrade("e", 23)) baseCost = baseCost.mul(upgradeEffect("e", 23)); // Apply cost reduction from Upgrade 23
                if (hasUpgrade("e", 33)) baseCost = baseCost.mul(upgradeEffect("e", 33)); // Apply cost reduction from Upgrade 33
                return baseCost; // Return adjusted cost
            },
            effect() {
                let baseEffect = new Decimal(50); // Base effect of the buyable
                if (hasUpgrade("e", 22)) baseEffect = baseEffect.mul(upgradeEffect("e", 22)); // Boosted effect by Upgrade 22
                return baseEffect; // Return adjusted effect
            },
            buy() {
                if (this.canAfford()) { // Check if the player can afford the buyable
                    player.points = player.points.sub(this.cost()); // Deduct cost from normal points
                    player.e.capacitors = player.e.capacitors.add(1); // Increment capacitor count
                    player.e.energyCap = player.e.energyCap.add(this.effect()); // Increase energy cap
                }
            },
            canAfford() {
                return player.points.gte(this.cost()); // Check if player can afford the buyable
            },
            total() {
                return player.e.capacitors; // Total capacitors owned
            }
        }
    },

    // Calculate total energy capacity based on upgrades and buyables
    totalEnergyCapacity() {
        let baseCap = player.e.energyCap;
        let upgradeCap = new Decimal(0);
        
        // Add capacity from upgrades
        if (hasUpgrade("e", 21)) upgradeCap = upgradeCap.add(upgradeEffect(this.layer, 21));
        if (hasUpgrade("e", 32)) upgradeCap = upgradeCap.add(upgradeEffect(this.layer, 32));
        
        // Add capacity from buyables
        upgradeCap = upgradeCap.add(player.e.capacitors.mul(buyables.e[11].effect())); // Effect of Energy Capacitor

        return baseCap.add(upgradeCap); // Total energy capacity
    },
    
    // Update energy cap based on upgrades and buyables
    onPrestige(gain) {
        player.e.energyCap = this.totalEnergyCapacity(); // Set the
