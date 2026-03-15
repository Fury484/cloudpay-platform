const pool = require("../config/db");
const { getChannel } = require("../config/rabbitmq");
const { transactionCounter } = require("../config/metrics");

async function createTransaction(userId, amount) {
const query = `     INSERT INTO transactions (user_id, amount, status)
    VALUES ($1, $2, 'pending')
    RETURNING *
  `;

const result = await pool.query(query, [userId, amount]);

const transaction = result.rows[0];

// increment Prometheus metric
transactionCounter.inc();

const channel = getChannel();

channel.sendToQueue(
"transaction_created",
Buffer.from(JSON.stringify(transaction))
);

console.log("Transaction event published:", transaction.id);

return transaction;
}

async function getTransactions(userId) {
const query = `     SELECT * FROM transactions
    WHERE user_id = $1
  `;

const result = await pool.query(query, [userId]);

return result.rows;
}

module.exports = {
createTransaction,
getTransactions
};