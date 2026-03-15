const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
const authHeader = req.headers["authorization"];

console.log("Authorization header:", authHeader);

if (!authHeader) {
return res.status(401).json({
error: "Access token required"
});
}

const token = authHeader.split(" ")[1];

console.log("Extracted token:", token);

try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);


console.log("Decoded token:", decoded);

req.user = decoded;

next();


} catch (error) {
console.log("JWT verification error:", error.message);


return res.status(403).json({
  error: "Invalid or expired token"
});


}
}

module.exports = authenticateToken;
