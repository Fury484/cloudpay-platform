const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

const transactionCounter = new client.Counter({
name: "transactions_created_total",
help: "Total number of transactions created"
});

module.exports = {
client,
transactionCounter
};
