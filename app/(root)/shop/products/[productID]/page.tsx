import Image from 'next/image';
import { getProductById } from '@/lib/actions/product.actions';
import { Button } from '@/components/shadcn/ui/button';
import QtyButton from '@/components/shop-components/QtyButton';

const page = async ({ params }: { params: { productID: string } }) => {
	const { title, image, rating, price, description } = await getProductById(
		params.productID
	);

	return (
		<section className='p-5 md:p-10 flex flex-col md:grid grid-cols-2 gap-3 h-auto'>
			<div className='flex flex-col-reverse md:grid grid-cols-4 gap-3 w-full h-full'>
				<div className='grid md:grid-flow-row grid-flow-col gap-2 md:grid-cols-1 w-full h-auto'>
					<Image
						src={image[0]}
						alt={title}
						width={155}
						height={155}
						className='w-full h-full object-cover rounded-lg'
					/>
					<Image
						src={image[0]}
						alt={title}
						width={155}
						height={155}
						className='w-full h-full object-cover rounded-lg'
					/>
					<Image
						src={image[0]}
						alt={title}
						width={155}
						height={155}
						className='w-full h-full object-cover rounded-lg'
					/>
				</div>
				<div className='grid col-span-3 w-full h-full'>
					<Image
						src={image[0]}
						alt={title}
						width={500}
						height={500}
						className='w-full h-full object-cover rounded-lg'
					/>
				</div>
			</div>
			<div className='flex flex-col flex-1 gap-2 h-full'>
				<h2 className='text-2xl font-bold'>{title}</h2>
				<p>{rating}</p>
				<h3 className='text-2xl font-semibold'>{price} €</h3>
				<p>{description}</p>
				<hr />
				<div className='flex flex-col gap-4'>
					<p>Choisissez la couleur</p>
					<div className='flex gap-2'>
						<div className='w-10 h-10 bg-blue-500 rounded-full'></div>
						<div className='w-10 h-10 bg-red-500 rounded-full'></div>
						<div className='w-10 h-10 bg-green-500 rounded-full'></div>
					</div>
					<hr />
					<div>
						<p>Choisissez la taille</p>
						<div className='flex gap-2'>
							<div className='rounded-full border py-2 px-4'>small</div>
							<div className='rounded-full border py-2 px-4'>medium</div>
							<div className='rounded-full border py-2 px-4'>large</div>
							<div className='rounded-full border py-2 px-4'>extra-large</div>
						</div>
					</div>
					<hr />
					<div className='flex flex-col gap-4'>
						<p>Quantité</p>
						<div className='flex items-center justify-center gap-3'>
							<div className='w-[120px] h-[40px] flex items-center justify-center bg-gray-200 rounded-full'>
								<QtyButton />
							</div>
							<Button className='flex-1 rounded-full'>Ajouter au panier</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default page;
