'use client';

import { useState } from 'react';
import Image from 'next/image';

import { ProfileProps } from '@/types';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from './shadcn/ui/form';
import { Input } from './shadcn/ui/input';
import { Textarea } from './shadcn/ui/textarea';
import { Button } from './shadcn/ui/button';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

const EditAccount = ({ user }: ProfileProps) => {
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing('imageUploader');
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			username: user?.username || '',
			bio: user?.bio || '',
			image: user?.image || '',
		},
	});

	const handleImage = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			setFiles(Array.from(e.target.files));

			if (!file.type.includes('image')) return;

			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || '';

				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};

	const onSubmit = async (values: any) => {
		const blob = values.image;
		const hasImageChanged = isBase64Image(blob);
		if (hasImageChanged) {
			const imgRes = await startUpload(files);
			if (imgRes && imgRes[0].url) {
				values.image = imgRes[0].url;
			}
		}

		await updateUser({
			userId: user!.id,
			username: values.username,
			name: {
				firstName: user!.name.firstName,
				lastName: user!.name.lastName,
			},
			email: user!.email,
			bio: values.bio,
			image: values.image,
			path: pathname,
		});

		if (pathname === 'profile/edit') {
			router.back();
		} else {
			router.push(`/`);
		}
		router.push(`/profile/${user!.id}`);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-start gap-10'>
				<FormField
					control={form.control}
					name='image'
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='account-form_image-label'>
								{field.value ? (
									<Image
										src={field.value}
										alt='profile photo'
										width={150}
										height={150}
										priority
										className='rounded-full object-contain'
									/>
								) : (
									<Image
										src='/assets/icons/user.svg'
										alt='profile photo'
										width={24}
										height={24}
										className='object-contain'
									/>
								)}
							</FormLabel>
							<FormControl className='flex-1 text-base-semibold text-gray-200'>
								<Input
									type='file'
									accept='image/*'
									placeholder='Upload a photo'
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='username'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-lg font-semibold'>Username</FormLabel>
							<FormControl className='text-black'>
								<Input type='text' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='bio'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-lg font-semibold'>Bio</FormLabel>
							<FormControl>
								<Textarea rows={15} {...field} className='text-black' />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit' className='text-lg font-semibold'>
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default EditAccount;
