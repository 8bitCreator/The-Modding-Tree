buyables: {
    11: {
        title: "Fire Generator",
        cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
        effect(x) { 
            let baseEffect = x.add(1).pow(0.5); // Original effect
            let boost = player.e.buyables[21].add(1).pow(0.3); // Boost from Flame Generator
            return baseEffect.mul(boost); // Apply the boost
        },
        display() {
            return `Generate more Fire. Currently: ${format(player.e.buyables[11])} Fire Generators.\n
                    Each generator produces ${format(this.effect())} Fire per second.\n
                    Cost for next: ${format(this.cost(player.e.buyables[11]))} points.`;
        },
        canAfford() { return player.points.gte(this.cost()); },
        buy() {
            player.points = player.points.sub(this.cost());
            player.e.buyables[11] = player.e.buyables[11].add(1);
        },
        effectDisplay() { return format(this.effect()) + "x"; },
        style: { 'background-color': '#FF4500', 'color': '#FFFFFF' }, // Fire color (orange-red)
    },
    12: {
        title: "Water Pump",
        cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
        effect(x) { 
            let baseEffect = x.add(1).pow(0.5); // Original effect
            let boost = player.e.buyables[22].add(1).pow(0.3); // Boost from Geyser
            return baseEffect.mul(boost); // Apply the boost
        },
        display() {
            return `Pump more Water. Currently: ${format(player.e.buyables[12])} Water Pumps.\n
                    Each pump produces ${format(this.effect())} Water per second.\n
                    Cost for next: ${format(this.cost(player.e.buyables[12]))} points.`;
        },
        canAfford() { return player.points.gte(this.cost()); },
        buy() {
            player.points = player.points.sub(this.cost());
            player.e.buyables[12] = player.e.buyables[12].add(1);
        },
        effectDisplay() { return format(this.effect()) + "x"; },
        style: { 'background-color': '#1E90FF', 'color': '#FFFFFF' }, // Water color (blue)
    },
    13: {
        title: "Earth Digger",
        cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
        effect(x) { 
            let baseEffect = x.add(1).pow(0.5); // Original effect
            let boost = player.e.buyables[23].add(1).pow(0.3); // Boost from Quake Generator
            return baseEffect.mul(boost); // Apply the boost
        },
        display() {
            return `Dig for more Earth. Currently: ${format(player.e.buyables[13])} Earth Diggers.\n
                    Each digger produces ${format(this.effect())} Earth per second.\n
                    Cost for next: ${format(this.cost(player.e.buyables[13]))} points.`;
        },
        canAfford() { return player.points.gte(this.cost()); },
        buy() {
            player.points = player.points.sub(this.cost());
            player.e.buyables[13] = player.e.buyables[13].add(1);
        },
        effectDisplay() { return format(this.effect()) + "x"; },
        style: { 'background-color': '#8B4513', 'color': '#FFFFFF' }, // Earth color (saddle brown)
    },
    14: {
        title: "Air Collector",
        cost(x) { return new Decimal(10).mul(x.add(1).pow(1.5)); }, // Starting cost of 10
        effect(x) { 
            let baseEffect = x.add(1).pow(0.5); // Original effect
            let boost = player.e.buyables[24].add(1).pow(0.3); // Boost from Tornado Machine
            return baseEffect.mul(boost); // Apply the boost
        },
        display() {
            return `Collect more Air. Currently: ${format(player.e.buyables[14])} Air Collectors.\n
                    Each collector produces ${format(this.effect())} Air per second.\n
                    Cost for next: ${format(this.cost(player.e.buyables[14]))} points.`;
        },
        canAfford() { return player.points.gte(this.cost()); },
        buy() {
            player.points = player.points.sub(this.cost());
            player.e.buyables[14] = player.e.buyables[14].add(1);
        },
        effectDisplay() { return format(this.effect()) + "x"; },
        style: { 'background-color': '#87CEEB', 'color': '#FFFFFF' }, // Air color (sky blue)
    },
},
