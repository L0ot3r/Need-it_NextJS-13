import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		createdAt: { type: Date, default: Date.now },
		rating: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Comment =
	mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
