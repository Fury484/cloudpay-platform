const amqp = require("amqplib");

async function startConsumer(processTransaction) {
const queue = "transaction_created";

let connection;
let channel;

while (true) {
try {
console.log("Connecting to RabbitMQ...");

  connection = await amqp.connect("amqp://rabbitmq:5672");
  channel = await connection.createChannel();

  await channel.assertQueue(queue);

  console.log("Connected to RabbitMQ");

  break;

} catch (error) {
  console.log("RabbitMQ not ready, retrying in 5 seconds...");
  await new Promise(res => setTimeout(res, 5000));
}


}

channel.consume(queue, async (msg) => {
const transaction = JSON.parse(msg.content.toString());


console.log("Processing transaction:", transaction.id);

await processTransaction(transaction);

channel.ack(msg);

});
}

module.exports = { startConsumer };
