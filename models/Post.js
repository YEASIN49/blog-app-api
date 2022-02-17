const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true
		},
		description: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			required: true,
		},
		username: {
			type: Array,
			required: false
		},
		categories: {

		}
	},
	{
		timestamps: true
	}
);

moodule.export = mongoose.modal("Post", PostScheme);