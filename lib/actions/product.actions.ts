'use server';

import { ProductTypes } from '@/types';
import { revalidatePath } from 'next/cache';

import { connectDB } from '../mongoose';
import Product from '../models/Product.model';

export async function getAllProducts() {
	try {
		connectDB();

		const products = await Product.find({});
		return products;
	} catch (error: any) {
		throw new Error(
			`Erreur lors de la récupération des produits: ${error.message}`
		);
	}
}

export async function addProduct({
	title,
	price,
	description,
	image,
	category,
	brand,
	rating,
	numReviews,
	countInStock,
	isOutOfStock,
	isLimitedStock,
	path,
}: ProductTypes) {
	try {
		connectDB();
		await Product.create({
			title,
			price,
			description,
			image,
			category,
			brand,
			rating,
			numReviews,
			countInStock,
			isOutOfStock,
			isLimitedStock,
		});

		// console.log(newProduct);
		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Erreur lors de l'ajout du produit: ${error.message}`);
	}
}

export async function getProductById(id: string) {
	try {
		connectDB();
		const product = await Product.findById(id);

		return product;
	} catch (error: any) {
		throw new Error(
			`Erreur lors de la récupération du produit: ${error.message}`
		);
	}
}
