const express = require("express");
const app = express();
const port = 5000; 

// middleware
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})