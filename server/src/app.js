const express = require("express");
const bodyParser = require("body-parser");
const providerRoutes = require("./routes/providerRoutes");
const cors = require("cors");
const Provider = require("./models/provider");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/provider", providerRoutes);
