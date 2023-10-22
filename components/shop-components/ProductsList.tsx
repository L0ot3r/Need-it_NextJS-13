import { ProductTypes } from '@/types';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface Props {
	title: string;
	maxItems?: number;
	data: ProductTypes[];
}

const ProductsList = ({ title, data, maxItems }: Props) => {
	return (
		<div className='flex flex-col gap-6 mt-10'>
			<h2 className='text-center text-4xl font-semibold mb-10'>{title}</h2>
			<div className='grid md:grid-cols-5 grid-cols-2 gap-5 items-center justify-center'>
				{data.length === 0 && (
					<div className='col-span-full'>
						<h4 className='text-center text-2xl'>Aucun article trouvé</h4>
					</div>
				)}
				{data
					.map((item, index) => (
						<div key={item._id} className='w-full h-full'>
							<Link
								href={`/shop/products/${item._id}`}
								className='w-full h-full'>
								<ProductCard product={item} />
							</Link>
						</div>
					))
					.slice(0, maxItems)
					.sort(() => Math.random() - 0.5)}
			</div>
		</div>
	);
};
export default ProductsList;
