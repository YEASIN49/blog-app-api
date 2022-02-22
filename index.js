const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

//initializing app
const app = express();
app.use(express.json());

//defining URI key
dotEnv.config();

//Database connectivity by mongoose
mongoose.connect(process.env.MONGO_URI) //will return promise
	.then(() => console.log("Connected to DB successfully"))
	.catch(err => console.log(err));



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("5000", () => {
	console.log("Starting server at http://localhost:5000")
})