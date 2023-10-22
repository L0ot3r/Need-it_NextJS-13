import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		id: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		name: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
		},
		email: { type: String, unique: true },
		password: { type: String },
		image: { type: String },
		bio: { type: String },
		isAdmin: { type: Boolean, default: false },
		onboarded: { type: Boolean, default: false },
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
		cart: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
