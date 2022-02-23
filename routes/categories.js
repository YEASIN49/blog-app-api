const router = require("express").Router();
// const User = require("../models/User");
// const Post = require("../models/Post");
const Category = require("../models/Category");

// CREATE CATEGORY
router.post("/", async (req, res) => {
	const newCategory = new Category(req.body);
	try {
		const savedCategory = await newCategory.save();
		res.status(200).json(savedCategory);
	} catch (err) {
		res.status(5000).json(err);
	}
});

// GET CATEGORY
router.get("/", async (req, res) => {
	try {
		const category = await Category.find();
		res.status(200).json(category);
	} catch (err) {
		res.status(5000).json(err);
	}
});


module.exports = router;