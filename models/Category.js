const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true
	}
);

moodule.export = mongoose.modal("Category", CategoryScheme);