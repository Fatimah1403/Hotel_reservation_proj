const express = require("express");
const app = express();
const router = express.Router();

const router = require("./routes/AuthRoute");
const authRouter = require("./AuthRoute");

// middleware
app.use(express.json());

//  All routes
router.use("/api/v1/auth", authRouter)


module.exports = router