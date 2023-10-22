import { SignIn } from '@clerk/nextjs';

const page = () => {
	return (
		<main className='max-w-md m-auto p-10'>
			<SignIn />
		</main>
	);
};

export default page;
