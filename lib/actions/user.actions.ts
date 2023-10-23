'use server';

import { connectDB } from '../mongoose';
import User from '../models/User.model';
import { ProductTypes } from '@/types';
import { revalidatePath } from 'next/cache';


interface UserProps {
  userId: string;
	username: string;
	name: {
		firstName: string;
		lastName: string;
	};
	email: string;
	image: string;
	bio?: string;
	path: string;
	cart?: ProductTypes[];
}

export async function updateUser({
	userId,
	username,
	name: { firstName, lastName },
	image,
	bio,
	email,
	cart,
	path,
}: UserProps): Promise<void> {
	connectDB();

	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username,
				name: {
          firstName: firstName,
          lastName: lastName,
        },
				image,
				bio,
				email,
				onboarded: true,
				cart,
			},
			{ upsert: true }
		);

		if (path === '/profile/edit') {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(
			`Echec de la mise à jour de l'utilisateur: ${error.message}`
		);
	}
}

export async function fetchUser(userId: string) {
  try {
    connectDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Echec de la récupération de l'utilisateur: ${error.message}`);
  }
}
