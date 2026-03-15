require("dotenv").config();

const app = require("./src/app");
const { connectRabbitMQ } = require("./src/config/rabbitmq");

const PORT = process.env.PORT || 4000;

async function startServer() {
await connectRabbitMQ();

app.listen(PORT, () => {
console.log(`Transaction service running on port ${PORT}`);
});
}

startServer();
