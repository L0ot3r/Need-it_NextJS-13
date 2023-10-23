import Image from 'next/image';
import Link from 'next/link';
import { SignOutButton } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/ui/popover';

const AcountNav = async ({ userId }: { userId: string }) => {
	const user = await fetchUser(userId);

	return (
		<div className={`flex gap-3 min-w-max justify-between`}>
			<Link href={'/'} className='hidden md:flex'>
				<Image src='/assets/icons/bag.svg' width={30} height={30} alt='cart' />
			</Link>
			<Popover>
				<PopoverTrigger>
					{user ? (
						<Image
							src={user.image}
							width={30}
							height={30}
							alt='user account'
							className='rounded-full object-cover'
						/>
					) : (
						<Image
							src='/assets/icons/user.svg'
							width={30}
							height={30}
							alt='user account'
						/>
					)}
				</PopoverTrigger>
				<PopoverContent className='w-auto'>
					<div className='flex flex-col gap-2'>
						<Link href={user ? `/onboarding` : '/sign-in'}>
							<div className='flex gap-2'>
								<Image
									src='/assets/icons/user.svg'
									width={25}
									height={25}
									alt='user account'
									className='fill-black'
								/>
								<p className='text-center'>Mon compte</p>
							</div>
						</Link>
						{user && (
							<SignOutButton>
								<div className='flex gap-2 cursor-pointer'>
									<Image
										src='/assets/icons/logout.svg'
										width={25}
										height={25}
										alt='logout'
										className='fill-black'
									/>
									Deconnexion
								</div>
							</SignOutButton>
						)}
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};
export default AcountNav;
