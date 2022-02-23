const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");




//initializing app
const app = express();
app.use(express.json());

//defining URI key
dotEnv.config();

//Database connectivity by mongoose
mongoose.connect(process.env.MONGO_URI) //will return promise
	.then(() => console.log("Connected to DB successfully"))
	.catch(err => console.log(err));


// SETTING IMAGE DESTINATION AND NAME
const imageStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images")
	}, filename: (req, file, callback) => {
		callback(null, req.body.name);
	}
})

// UPLOADING IMAGE
const uploadImage = multer({
	storage: imageStorage
});


app.use("/api/upload", uploadImage.single("file"), (req, res) => {
	res.status(200).json("File Uploaded");
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
	console.log("Starting server at http://localhost:5000")
})