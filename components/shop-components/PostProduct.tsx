'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { Textarea } from '@/components/shadcn/ui/textarea';
import { Button } from '../shadcn/ui/button';

import { useForm } from 'react-hook-form';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import { addProduct } from '@/lib/actions/product.actions';

const PostProduct = () => {
	const { startUpload } = useUploadThing('productImg');
	const [files, setFiles] = useState<File[]>([]);
	const [moreOpt, setMoreOpt] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			title: '',
			price: '',
			description: '',
			image: [''],
			category: '',
			brand: '',
			rating: 0,
			numReviews: 0,
			countInStock: 1,
			isOutOfStock: false,
			isLimitedStock: true,
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
		const hasImageAdded = blob ? isBase64Image(blob) : false;
		if (hasImageAdded) {
			const imgRes = await startUpload(files);

			if (imgRes && imgRes[0].url) {
				values.image = imgRes[0].url;
			}
		}

		await addProduct({
			title: values.title,
			price: values.price,
			description: values.description,
			image: values.image,
			category: values.category,
			brand: values.brand,
			rating: values.rating,
			numReviews: values.numReviews,
			countInStock: values.countInStock,
			isOutOfStock: values.isOutOfStock,
			isLimitedStock: values.isLimitedStock,
			path: pathname,
		});

		router.push('/shop');
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 w-1/2 mx-auto mt-10'>
				<FormField
					name='title'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Titre</FormLabel>
							<FormControl>
								<Input type='text' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='description'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									rows={10}
									placeholder={`Faîtes une description de l'article`}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='price'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prix</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					name='image'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ajouter une photo de l'article</FormLabel>
							<FormControl>
								<Input
									type='file'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Input
					type='button'
					value={!moreOpt ? "+ Plus d'options" : "- Moins d'options"}
					onClick={() => setMoreOpt(!moreOpt)}
					className='w-full text-center font-bold text-blue-500'
				/>
				{moreOpt && (
					<>
						<FormField
							name='brand'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Marque</FormLabel>
									<FormControl>
										<Input type='text' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='category'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Catégorie</FormLabel>
									<FormControl>
										<Input type='text' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='countInStock'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantité en stock</FormLabel>
									<FormControl>
										<Input type='number' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</>
				)}
				<Button type='submit'>Envoyer l'article</Button>
			</form>
		</Form>
	);
};
export default PostProduct;
