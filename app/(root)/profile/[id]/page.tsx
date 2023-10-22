import Link from 'next/link'
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import ProfileHeader from '@/components/ProfileHeader';
import Image from 'next/image';

const page = async ({ params } : { params : { id: string }}) => {
  const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(params.id);
	if (!userInfo.onboarded) redirect('/onboarding');

	return (
		<section className='mt-9 p-10'>
			<ProfileHeader
				accountId={userInfo.id}
				authUserId={user.id}
				imgUrl={userInfo.image}
				name={userInfo.name.firstName + ' ' + userInfo.name.lastName}
				username={userInfo.username}
				bio={userInfo.bio}
			/>
			<div className='inline-flex items-center gap-3 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-500 cursor-pointer'>
				<Link href={'/onboarding'}>
					Editer
				</Link>
					<Image 
						src='/assets/icons/edit.svg'
						width={20}
						height={20}
						alt='edit'
					/>
			</div>
		</section>
	);
};
export default page;
