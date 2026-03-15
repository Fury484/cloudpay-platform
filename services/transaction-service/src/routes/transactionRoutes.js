const express = require("express");
const router = express.Router();

const {
create,
list
} = require("../controllers/transactionController");

const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, create);
router.get("/", authenticateToken, list);

module.exports = router;
