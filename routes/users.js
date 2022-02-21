const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//Update
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			req.body.password = hashedPassword;
		}
		try {
			const updateUser = await User.findByIdAndUpdate(
				req.params.id, {
				$set: req.body,
			}, {
				new: true,
			});
			const { password, ...otherInfo } = updateUser._doc;
			res.status(200).json(otherInfo);

		} catch (err) {
			res.status(500).json(err)
		}
	} else {
		res.status(401).json("Please Login First");
	}
})



// DELETE
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		const user = await User.findById(req.params.id);
		if (user) {
			try {
				// const userPost = await Post.fin
				await Post.deleteMany({ username: user.username });
				await User.findByIdAndDelete(req.params.id);
				res.status(200).json("User has been deleted successfully");
			} catch (err) {
				req.status(500).json(err);
			}
		} else {
			res.status(404).json("User not found!");
		}
	} else {
		res.status(401).json("You cannot delete others account")
	}
})

// GET USER
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...otherInfo } = user._doc;
		res.status(200).json(otherInfo);
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;