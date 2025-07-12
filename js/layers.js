addLayer("t", {
    name: "Time Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        first: new Decimal(0),
    }},
    color: "rgba(156, 64, 174, 1)",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Time Crystals", // Name of prestige currency
    baseResource: "Seconds", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
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
    componentStyles: {
    "upgrade"() { return {'height': '150px', 'width': '350px'} },
    },
    buyables: {
    11: {
        title: function() { return "1st Time Dimension (x" + format(getBuyableAmount(this.layer, this.id)) + ")" },
        cost(x) { return new Decimal(1).mul(Decimal.pow(10, x.div(10).floor())) },
        display() { return "Cost: " + format(this.cost()) + "Time Crystals\nProduction: " },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        amount() { return getBuyableAmount(this.layer, this.id) },
        effect() { return tmp[this.layer].buyables[this.id].amount }
    },
    }
})
