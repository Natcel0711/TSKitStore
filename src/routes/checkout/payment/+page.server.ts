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
				},
				paid:false
			}
		});
		return items;
	};
	return {
		items: CartItems()
	};
};

export const Pay: Action = async ({ locals, request }) => {
	const data = await request.formData()
	const CardName:string = data.get('CardName') as string
	const CardNo = data.get('CardNo') as string
	const CVC = data.get('CVC') as string
	const ExpDate = data.get('ExpDate') as string
	if (CardName.length < 2) {
		return invalid(400,{
			error: true,
			message: 'Name should be longer than 1 character',
			CardName,
			CardNo,
			CVC,
			ExpDate
		})
	}
	if (CardNo.length !== 16) {
		return invalid(400,{
			error: true,
			message: 'Card number should be 16 digits',
			CardName,
			CardNo,
			CVC,
			ExpDate
		})
	}
	if (CVC.length !== 3) {
		return invalid(400,{
			error: true,
			message: 'CVC must be 3 digits',
			CardName,
			CardNo,
			CVC,
			ExpDate
		})
	}
	
	const userarray = await db.$queryRaw<User[]>(
		Prisma.sql`SELECT * FROM user WHERE username = ${locals.user.name}`
	);

	if (!userarray) return invalid(400, { user: true });

	// const user: User = userarray[0];
	// const payment = await db.paymentHistory.create({
	// 	data: {
	// 		user: {
	// 			connect: {
	// 				id: user.id
	// 			}
	// 		}
	// 	}
	// });
	// const cartitems = await db.$queryRaw<Checkout[]>(
	// 	Prisma.sql`UPDATE items 
    //           SET paymentid = ${payment.id}, 
    //           paid = True WHERE userid = ${user.id} 
    //           AND paid = false`
	// );
	// return payment.id
};

export const actions: Actions = { Pay };
