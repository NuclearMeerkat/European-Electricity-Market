const providerService = require("../services/providerService");

class ProviderControler{

    async createProvider(req, res) {
        try {
            const {name, country, market_share, renewable_energy_percentage, yearly_revenue } = req.body;
            const saveProvider = await providerService.createProvider(name, country, market_share, renewable_energy_percentage, yearly_revenue );
            res.json(saveProvider);
        } catch(error) {
            res.status(500).json({ error: error.message })
        }
    };

    async getAllProviders(req, res) {
        try{
            const providers = await providerService.getAllProviders();
            res.json(providers);
        } catch(error) {
            res.status(500).json({error:error.message});
        }
    }

    async getProviderById(req, res) {
        const providerId = req.params.id;
        try{
            const provider = await providerService.getProviderById(providerId);
            if (!provider){
                return res.status(404).json({ error: "User not found"});
            }    
            res.json(provider);
        } catch (error){
            res.status(500).json({ error: error.message});
        }
    }

    async updateProvider(req, res) {
        const providerId = req.params.id;
        const updatedData = req.body;
        try{
            const updatedProvider = await providerService.updateProvider(providerId, updatedData);
            if (!updatedProvider){
                return res.status(404).json({ error: "Provider not found"});
            }    
            res.json(updatedProvider);
        } catch (error){
            res.status(500).json({ error: error.message});
        }
    }

    async deleteProvider(req, res) {
        const providerId = req.params.id;
        try{
            const deletedProvider = await providerService.deleteProvider(providerId);
            if (!deletedProvider)
                return res.status(404).json({ error: "User not found"});
            res.json({ message: "Provider deleted successfully", provider: deletedProvider});
        } catch (error){
            res.status(500).json({ error: error.message});
        }
    }
};

module.exports = new ProviderControler;