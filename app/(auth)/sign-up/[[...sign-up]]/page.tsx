import { SignUp } from '@clerk/nextjs';

const page = () => {
	return (
		<main className='max-w-md m-auto p-10'>
			<SignUp />
		</main>
	);
};

export default page;
