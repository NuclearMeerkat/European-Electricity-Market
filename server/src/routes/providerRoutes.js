const express = require("express");
const providerControler = require("../controlers/providerControler");

const router = express.Router();

router.post("/", providerControler.createProvider);

router.get("/", providerControler.getAllProviders);

router.get("/:id", providerControler.getProviderById);

router.patch("/:id", providerControler.updateProvider);

router.delete("/:id", providerControler.deleteProvider);

module.exports = router;