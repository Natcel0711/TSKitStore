import { invalid, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { db } from '$lib/database';

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
	ADMIN = 'ADMIN',
	USER = 'USER'
}
class Register {
	constructor(name: FormDataEntryValue, pass: FormDataEntryValue) {
		this.username = name;
		this.password = pass;
	}
	username: string | null | FormDataEntryValue;
	password: string | null | FormDataEntryValue;
}
const RegiserSchema = z.object({
	username: z
		.string({ required_error: 'Must provide a username' })
		.trim()
		.min(1, 'Must be at least 1 character')
		.max(25),
	password: z
		.string({ required_error: 'Must provide a password' })
		.trim()
		.min(8, 'Password must be at least 8 characters')
});

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/');
	}
};
const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username') as string;
	const password = data.get('password') as string;
	let reg = new Register(username, password);
	try {
		let result = RegiserSchema.parse(reg);
		console.log(`Register success: ${result}`);
	} catch (ex) {
		console.log(`Register error: ${ex}`);
	}
	if (
		typeof reg.username !== 'string' ||
		typeof reg.password !== 'string' ||
		!reg.username ||
		!reg.password
	) {
		return invalid(400, { invalid: true });
	}

	const user = await db.user.findUnique({
		where: { username }
	});

	if (user) {
		return invalid(400, { user: true });
	}

	await db.user.create({
		data: {
			username,
			passwordHash: await bcrypt.hash(reg.password, 10),
			userAuthToken: crypto.randomUUID(),
			role: { connect: { name: Roles.USER } }
		}
	});

	throw redirect(303, '/login');
};

export const actions: Actions = { register };
