const Provider = require("../models/provider");

class ProviderService { 
    
    async createProvider(name, coutry, market_share, renewable_energy_percentage, yearly_revenue){
        const newProvider = new Provider({name, coutry, market_share, renewable_energy_percentage, yearly_revenue});
        return await newProvider.save();
    }
    
    async getAllProviders() {
        return await Provider.find({});
    }

    async getProviderById(providerId) {
        return await Provider.findById(providerId);
    }

    async updateProvider(providerId, updatedData) {
        return await Provider.findByIdAndUpdate(providerId, updatedData, {
            new: true
        })
    }

    async deleteProvider(providerId) {
        return await Provider.findByIdAndDelete(providerId);
    }
};

module.exports = new ProviderService;