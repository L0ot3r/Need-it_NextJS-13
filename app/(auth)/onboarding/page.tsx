import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import EditAccount from '@/components/EditAccount';

async function Dashboard() {
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user?.id);

	const userData = {
		id: user.id,
		username: userInfo ? userInfo?.username : user.username,
		name: {
			firstName: userInfo ? userInfo?.name?.firstName : user.firstName,
			lastName: userInfo ? userInfo?.name?.lastName : user.lastName,
		},
		bio: userInfo ? userInfo?.bio : '',
		image: userInfo ? userInfo?.image : user.imageUrl,
		email: userInfo ? userInfo.email : user.emailAddresses[0].emailAddress,
	};

	return (
		<main className='mx-auto flex flex-col w-full px-10 py-20 text-white'>
			<h1 className='text-2xl font-bold'>Dasboard</h1>
			<section className='mt-9 p-10'>
				<EditAccount user={userData} />
			</section>
		</main>
	);
}
export default Dashboard;
