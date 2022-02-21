const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register

// Creation
router.post("/register", async (req, res) => {
	try {
		const salt = 10;
		const hashedPass = await bcrypt.hash(req.body.password, salt);
		const newUserObj = new User({
			// req.body
			username: req.body.username,
			email: req.body.email,
			password: hashedPass,
		});

		const user = await newUserObj.save();
		res.status(200).json(user)

	} catch (err) {
		res.status(500).json(err);
	}
})

// Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		(!user && res.status(400).json("Username or Password is worng!"));

		const validated = await bcrypt.compare(req.body.password, user.password);
		!validated && res.status(400).json("Username or Password is worng!");

		const { password, ...otherInformation } = user._doc;
		res.status(200).json(otherInformation);

	} catch (err) {
		res.status(500).json();
	}
})

module.exports = router;