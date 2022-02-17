const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");

dotEnv.config();

mongoose.connect(process.env.MONGO_URL)
	.then(console.log("Connected 8x"))
	.catch(err => console.log(err));


console.log("Running Now")

app.listen("5000", () => {
	console.log("backend is running")
})