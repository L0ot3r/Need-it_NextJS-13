import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
	return (
		<div className='w-full hero-bg'>
			<div className='flex flex-col h-full md:flex-row relative overflow-hidden'>
				<div className='flex flex-col gap-8 md:w-1/2 h-auto items-start justify-center lg:px-10 px-4 py-8 flex-1'>
					<h1 className='sm:text-head text-4xl font-bold text-left'>
						Trouvez les vêtements qui correspondent à votre style
					</h1>
					<p className='text-xl text-black opacity-70'>
						Browse through our diverse range of meticulously crafted garments,
						designed to bring out your individuality and cater to your sense of
						style.
					</p>
					<Link
						href='/shop'
						className='bg-black px-4 py-2 rounded-full text-white mx-auto w-full sm:w-auto md:mx-0 text-center'>
						Acheter maintenant
					</Link>
					<div className='flex flex-wrap gap-10 w-full items-center justify-center'>
						<div>
							<p className='text-2xl font-bold'>200+</p>
							<p>Marques internationale</p>
						</div>
						<div>
							<p className='text-2xl font-bold'>2000+</p>
							<p>Articles de qualités</p>
						</div>
						<div>
							<p className='text-2xl font-bold'>30000+</p>
							<p>Clients satisfaits</p>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center justify-end px-5 w-full md:w-1/2'>
					<Image
						src='/assets/images/hero-img.png'
						width={300}
						height={350}
						alt='hero image'
						className='object-cover w-full sm:w-fit sm:h-fiw-fit'
					/>
				</div>
			</div>
		</div>
	);
};
export default HeroSection;
