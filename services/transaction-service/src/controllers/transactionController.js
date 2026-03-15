const {
createTransaction,
getTransactions
} = require("../services/transactionService");

exports.create = async (req, res) => {
try {
const userId = req.user.userId;
const { amount } = req.body;

const transaction = await createTransaction(userId, amount);

res.status(201).json(transaction);

} catch (error) {
res.status(500).json({ error: error.message });
}
};

exports.list = async (req, res) => {
try {
const userId = req.user.userId;

const transactions = await getTransactions(userId);

res.json(transactions);

} catch (error) {
res.status(500).json({ error: error.message });
}
};
