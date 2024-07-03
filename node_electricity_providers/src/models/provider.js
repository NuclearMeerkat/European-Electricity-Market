const mongoose = require("../configuration/dbConfig");

const providerSchema = mongoose.Schema({
    name: String,
    country: String,
    market_share: Number,
    renewable_energy_percentage: Number,
    yearly_revenue: Number
})

var Provider = mongoose.model('providers', providerSchema);

module.exports = Provider;