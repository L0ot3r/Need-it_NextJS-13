export type ProductTypes = {
	_id?: string;
	title: string;
	brand?: string;
	image: string;
	price: number;
	description: string;
	category?: string;
	rating?: number;
	numReviews?: number;
	countInStock: number;
	isOutOfStock?: boolean;
	isLimitedStock?: boolean;
	path: string;
};

export type ProfileProps = {
  user?: {
    id: string;
		username: string;
    name: {
      firstName: string;
      lastName: string;
    }
    bio: string;
    image: string;
    email: string;
		cart?: ProductTypes[];
  }
};
