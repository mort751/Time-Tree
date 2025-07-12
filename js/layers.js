addLayer("t", {
    name: "Time Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        first: new Decimal(0),
        second: new Decimal(0),
        third: new Decimal(0),
        fourth: new Decimal(0),
        fifth: new Decimal(0),
        sixth: new Decimal(0),
        seventh: new Decimal(0),
        eighth: new Decimal(0),
    }},
    color: "rgba(156, 64, 174, 1)",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Time Crystals", // Name of prestige currency
    baseResource: "Seconds", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.025, // Prestige currency exponent
    base: 1.1,
    resetDescription: "Timeloop for: ",
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Timeloop for Time Crystals", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() { return true },
    update(diff) {
    player[this.layer].first = player[this.layer].first.add(buyableEffect(this.layer, 21).mul(diff))
    player[this.layer].second = player[this.layer].second.add(buyableEffect(this.layer, 31).mul(diff))
    player[this.layer].third = player[this.layer].third.add(buyableEffect(this.layer, 41).mul(diff))
    },
    componentStyles: {
    "buyable"() { return {'height': '150px', 'width': '350px', 'font-size': '11.5px'} },
    },
    buyables: {
    11: {
        title: function() { return "Time Dimension 1 (" + format(tmp[this.layer].buyables[this.id].amount) + ")" },
        cost(x=getBuyableAmount(this.layer, this.id)) { return new Decimal(1).mul(Decimal.pow(2, x.div(10).floor())).mul(x.add(1)) },
        display() { return "Cost: " + format(this.cost()) + " Time Crystals\nProduction: " + format(buyableEffect(this.layer, this.id)) + " Seconds/sec\nBought: " + format(getBuyableAmount(this.layer, this.id)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        amount() { return getBuyableAmount(this.layer, this.id).add(player[this.layer].first) },
        effect() { return tmp[this.layer].buyables[this.id].amount }
    },
    21: {
        title: function() { return "Time Dimension 2 (" + format(tmp[this.layer].buyables[this.id].amountt) + ")" },
        cost(x=getBuyableAmount(this.layer, this.id)) { return new Decimal(10).mul(Decimal.pow(3, x.div(10).floor())).mul(x.add(1)) },
        display() { return "Cost: " + format(this.cost()) + " Time Crystals\nProduction: " + format(buyableEffect(this.layer, this.id)) + " TD1s/sec\nBought: " + format(getBuyableAmount(this.layer, this.id)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        amount() { return getBuyableAmount(this.layer, this.id).add(player[this.layer].second) },
        effect() { return tmp[this.layer].buyables[this.id].amount.mul(0.1) },
        unlocked() { return getBuyableAmount(this.layer,  11).gte(10) || getBuyableAmount(this.layer,  this.id).gte(1) }
    },
    31: {
        title: function() { return "Time Dimension 3 (" + format(tmp[this.layer].buyables[this.id].amountt) + ")" },
        cost(x=getBuyableAmount(this.layer, this.id)) { return new Decimal(10).mul(Decimal.pow(3, x.div(10).floor())).mul(x.add(1)) },
        display() { return "Cost: " + format(this.cost()) + " Time Crystals\nProduction: " + format(buyableEffect(this.layer, this.id)) + " TD2s/sec\nBought: " + format(getBuyableAmount(this.layer, this.id)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        amount() { return getBuyableAmount(this.layer, this.id).add(player[this.layer].third) },
        effect() { return tmp[this.layer].buyables[this.id].amount.mul(0.1) },
        unlocked() { return getBuyableAmount(this.layer,  21).gte(10) || getBuyableAmount(this.layer,  this.id).gte(1) }
    },
    41: {
        title: function() { return "Time Dimension 4 (" + format(tmp[this.layer].buyables[this.id].amountt) + ")" },
        cost(x=getBuyableAmount(this.layer, this.id)) { return new Decimal(10).mul(Decimal.pow(3, x.div(10).floor())).mul(x.add(1)) },
        display() { return "Cost: " + format(this.cost()) + " Time Crystals\nProduction: " + format(buyableEffect(this.layer, this.id)) + " TD3s/sec\nBought: " + format(getBuyableAmount(this.layer, this.id)) },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        amount() { return getBuyableAmount(this.layer, this.id).add(player[this.layer].fourth) },
        effect() { return tmp[this.layer].buyables[this.id].amount.mul(0.1) },
        unlocked() { return getBuyableAmount(this.layer,  31).gte(10) || getBuyableAmount(this.layer,  this.id).gte(1) }
    },
    }
})
