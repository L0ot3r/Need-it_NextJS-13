import Image from 'next/image';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';

const AcountNav = async ({ userId }: { userId: string }) => {
	const user = await fetchUser(userId);

	return (
		<div className='flex gap-3'>
			<Link href={'/'}>
				<Image src='/assets/icons/bag.svg' width={30} height={30} alt='cart' />
			</Link>
			<Link href={user ? `/profile/${user.id}` : '/sign-in'}>
				{user ? (
					<Image
						src={user.image}
						width={30}
						height={30}
						alt='user account'
						className='rounded-full'
					/>
				) : (
					<Image
						src='/assets/icons/user.svg'
						width={30}
						height={30}
						alt='user account'
					/>
				)}
			</Link>
			{user && (
				<SignOutButton>
					<Image
						src='/assets/icons/logout.svg'
						width={30}
						height={30}
						alt='logout'
						className='cursor-pointer'
					/>
				</SignOutButton>
			)}
		</div>
	);
};
export default AcountNav;
