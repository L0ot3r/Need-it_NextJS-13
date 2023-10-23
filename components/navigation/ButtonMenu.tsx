import Image from 'next/image';
import Link from 'next/link';

import AcountNav from './AcountNav';
import { Popover, PopoverTrigger, PopoverContent } from '../shadcn/ui/popover';
import { Input } from '../shadcn/ui/input';
import { currentUser } from '@clerk/nextjs';

const ButtonMenu = async () => {
	const user = await currentUser();
	if (!user) return null;
	return (
		<Popover>
			<PopoverTrigger>
				<div className='flex flex-col w-[30px] h-full gap-1 md:hidden'>
					<div className='bg-black rounded-full w-full h-[4px]'></div>
					<div className='bg-black rounded-full w-full h-[4px]'></div>
					<div className='bg-black rounded-full w-full h-[4px]'></div>
				</div>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col gap-5'>
				<div className='md:hidden w-full block'>
					<AcountNav userId={user.id} />
				</div>
				<hr className='md:hidden inline' />
				<div className='relative sm:hidden inline-flex'>
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
				<div className='flex flex-col gap-2'>
					<Link href={'/shop'} className='md:hidden inline'>
						Cart
					</Link>
					<Link href={'/shop'}>Shop</Link>
					<Link href={'/'}>Marques</Link>
					<Link href={'/shop/add-product'}>Ajouter un article</Link>
				</div>
			</PopoverContent>
		</Popover>
	);
};
export default ButtonMenu;
