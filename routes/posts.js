const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const postAuthor = await User.findOne({ username: newPost.username });
		// console.log(postAuthor);
		try {
			if (postAuthor.username === newPost.username) { }
			{
				try {
					const savePost = await newPost.save();
					res.status(200).json(savePost);
				} catch (error) {
					res.status(500).json(`[${error}]Unable to save post`)
				}
			}
		} catch (err) {
			res.status(401).json("You are not the valid Author")
			// 	// const { username, ...other } = postAuthor._doc;
			// res.status(200).json(postAuthor);
		}
	} catch (err) {
		res.status(5000).json(`[${err}] user not found`);
	}
});

// UPDATE POST
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		// try {
		if (post.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedPost)
			} catch (error) {
				res.status(500).json("Post Find and Update Failed");
			}
		} else {
			res.status(401).json("You can update only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
})

// DELETE POST

router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.username === req.body.username) {
			try {
				await post.delete();
				res.status(200).json("Post deleted successfully")
			} catch (error) {
				res.status(500).json(error);
			}
		} else {
			res.status(401).json("You cannot delete other's post")
		}
	} catch (error) {

	}
})

// GET POST
router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		const { password, ...otherInfo } = post._doc;
		res.status(200).json(otherInfo);
	} catch (error) {
		res.status(500).json(error)
	}
})

// GET ALL POST
router.get("/", async (req, res) => {
	const username = req.query.user;
	const categoryName = req.query.categoryName;
	try {
		let requiredPost;
		if (username) {
			requiredPost = await Post.find({ username });
		}
		else if (categoryName) {
			requiredPost = await Post.find({
				categories: {
					$in: [categoryName]
				}
			});
		}
		else {
			requiredPost = await Post.find();
		}
		res.status(200).json(requiredPost);
	} catch (error) {
		res.status(500).json(error);
	}
})

module.exports = router;