require("dotenv").config();

const pool = require("./config/db");
const { startConsumer } = require("./config/rabbitmq");

async function processTransaction(transaction) {

console.log("Simulating payment processing...");

await new Promise(resolve => setTimeout(resolve, 2000));

await pool.query(
"UPDATE transactions SET status='completed' WHERE id=$1",
[transaction.id]
);

console.log("Transaction completed:", transaction.id);
}

startConsumer(processTransaction);
