import Image from 'next/image';
import { brandsImg } from '@/constants';

const BrandBar = () => {
	return (
		<div className='bg-black flex flex-wrap md:flex-nowrap  gap-5 items-center lg:justify-around justify-center w-full p-3'>
			{brandsImg.map((brand, index) => (
				<div key={index} className='flex items-center justify-center py-4'>
					<Image
						src={brand.src}
						alt={brand.alt}
						width={150}
						height={110}
						className='object-cover w-auto h-auto'
					/>
				</div>
			))}
		</div>
	);
};
export default BrandBar;
