const { registerUser, loginUser } = require('../services/authService');

exports.register = async (req, res) => {
try {
const { email, password } = req.body;


const user = await registerUser(email, password);

res.status(201).json({
  message: "User registered successfully",
  user
});


} catch (error) {
res.status(500).json({
error: error.message
});
}
};

exports.login = async (req, res) => {
try {
const { email, password } = req.body;


const result = await loginUser(email, password);

res.json({
  message: "Login successful",
  ...result
});


} catch (error) {
res.status(401).json({
error: error.message
});
}
};