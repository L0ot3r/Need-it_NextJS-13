import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../shadcn/ui/input';
import { currentUser } from '@clerk/nextjs';
import AcountNav from './AcountNav';
import ButtonMenu from './ButtonMenu';

const Navbar = async () => {
	const user = await currentUser();
	if (!user) return null;

	return (
		<nav className='flex items-center gap-7 sm:px-4 justify-between'>
			<div>
				<Link href={'/'}>
					<h2 className='text-3xl font-bold'>
						Need<span className='text-4xl text-red-400'>.</span>
						<span className='text-blue-700'>It</span>
					</h2>
				</Link>
			</div>

			<ul className='md:flex justify-center items-center gap-4 hidden'>
				<li>
					<Link href={'/shop'}>Shop</Link>
				</li>
				<li>
					<Link href={'/'}>Marques</Link>
				</li>
				<li>
					<Link href={'/shop/add-product'}>Ajouter un article</Link>
				</li>
			</ul>
			<div className='relative flex-1 hidden sm:inline-flex'>
				<Image
					src='/assets/icons/search-gray.svg'
					width={20}
					height={20}
					alt='search'
					className='absolute inline-block top-1/2 left-3 transform -translate-y-1/2'
				/>
				<Input
					type='text'
					placeholder='Recherchez un article'
					className='pl-10 rounded-full text-black'
				/>
			</div>
			<ButtonMenu />
			<div className='hidden md:inline'>
				<AcountNav userId={user.id} />
			</div>
		</nav>
	);
};

export default Navbar;
