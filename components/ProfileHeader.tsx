import Image from 'next/image';

interface ProfileHeaderProps {
	authUserId: string;
	accountId: string;
	imgUrl: string;
	name: string;
	username: string;
	bio: string;
}

const ProfileHeader = ({ imgUrl, name, username, bio }: ProfileHeaderProps) => {
	return (
		<div className='flex flex-col justify-start'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='relative h-20 w-20 object-cover'>
						<Image
							src={imgUrl}
							alt={name}
							width={250}
							height={250}
							className='rounded-full object-cover shadow-2xl w-auto h-auto'
						/>
					</div>
					<div className='flex-1'>
						<h2 className='text-left text-3xl font-bold'>{name}</h2>
						<p className='text-base-medium text-gray-400'>@{username}</p>
					</div>
				</div>
			</div>

			<p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

			<div className='mt-12 h-0.5 w-full bg-dark-3' />
		</div>
	);
};
export default ProfileHeader;
