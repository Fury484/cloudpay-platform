const express = require("express");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionRoutes);

app.get("/health", (req, res) => {
res.status(200).json({
status: "OK",
service: "transaction-service"
});
});

module.exports = app;

const { client } = require("./config/metrics");

app.get("/metrics", async (req, res) => {
res.set("Content-Type", client.register.contentType);
res.end(await client.register.metrics());
});