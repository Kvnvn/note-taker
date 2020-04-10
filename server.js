// requirements 
const fs =require("fs")
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
// This middleware is responsible for constructing the
// body property on the response object passed to our route handlers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});













// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});