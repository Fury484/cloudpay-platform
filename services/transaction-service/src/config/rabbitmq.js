const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
const queue = "transaction_created";

while (true) {
try {
console.log("Connecting to RabbitMQ...");

  const connection = await amqp.connect("amqp://rabbitmq:5672");
  channel = await connection.createChannel();

  await channel.assertQueue(queue);

  console.log("RabbitMQ connected");

  break;
} catch (error) {
  console.log("RabbitMQ not ready yet. Retrying in 5 seconds...");
  await new Promise(res => setTimeout(res, 5000));
}


}
}

function getChannel() {
return channel;
}

module.exports = { connectRabbitMQ, getChannel };
