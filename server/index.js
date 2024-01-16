const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000; 

// middleware
app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the Database")
      } catch (error) {
        console.error("Error connecting to Database", error);
        process.exit(1)
      }
}

// Error handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})

connectDB();