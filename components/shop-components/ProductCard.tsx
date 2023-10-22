import Image from 'next/image';
import { Card } from '../shadcn/ui/card';
import { ProductTypes } from '@/types';

const ProductCard = async ({ product }: { product: ProductTypes }) => {
	const { image, title, brand, countInStock, price } = product;

	return (
		<Card className='flex h-full min-w-full flex-col justify-between gap-3 shadow-md cursor-pointer'>
			<Image
				src={image[0]}
				alt={title}
				width={150}
				height={150}
				className='object-cover w-full bg-gray-400'
			/>
			<div className='flex flex-col w-full h-full px-2 py-3'>
				<div className='flex flex-col flex-1'>
					<p className='flex text-lg font-bold'>{title}</p>
					<p>{brand}</p>
				</div>
				<div className='flex items-end justify-between'>
					<p>{countInStock}</p>
					<p className='text-2xl font-bold'>{price} €</p>
				</div>
			</div>
		</Card>
	);
};
export default ProductCard;
