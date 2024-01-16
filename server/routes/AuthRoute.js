const express = require("express");
const app = express();

const router = express.Router();

router.post("/register", AuthController.register) // yet to be implemented in d controller
router.post("/login", AuthController.login) // yet to be implemented in d controller

module.exports = router;