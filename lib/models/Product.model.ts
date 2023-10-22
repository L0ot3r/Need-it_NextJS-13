import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String },
		category: { type: String },
		brand: { type: String },
		rating: { type: Number },
		numReviews: { type: Number },
		countInStock: { type: Number },
		isOutOfStock: { type: Boolean, default: false },
		isLimitedStock: { type: Boolean, default: false },
		image: [{ type: String, required: true }],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

const Product =
	mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
