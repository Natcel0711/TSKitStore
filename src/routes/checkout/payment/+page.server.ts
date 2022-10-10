import type { Action, Actions, PageServerLoad } from './$types';

import { db } from '$lib/database';
import { Prisma } from '@prisma/client';
import type { User } from '$lib/models/User';
import { invalid } from '@sveltejs/kit';
import type { Checkout } from '$lib/models/Product';
export const load: PageServerLoad = async ({ locals }) => {
	const CartItems = async () => {
		const items = db.items.findMany({
			where: {
				user: {
					username: locals.user.name
				}
			}
		});
		return items;
	};
	return {
		items: CartItems()
	};
};

export const Pay: Action = async ({ locals }) => {
	const userarray = await db.$queryRaw<User[]>(
		Prisma.sql`SELECT * FROM user WHERE username = ${locals.user.name}`
	);

	if (!userarray) return invalid(400, { user: true });

	const user: User = userarray[0];
	const payment = await db.paymentHistory.create({
		data: {
			user: {
				connect: {
					id: user.id
				}
			}
		}
	});
	const cartitems = await db.$queryRaw<Checkout[]>(
		Prisma.sql`UPDATE items 
              SET paymentid = ${payment.id}, 
              paid = True WHERE userid = ${user.id} 
              AND paid = false`
	);
};

export const actions: Actions = { Pay };
