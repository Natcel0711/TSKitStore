import type { Action, Actions, PageServerLoad } from './$types';
import { z } from 'zod';
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
				paid: false
			}
		});
		return items;
	};
	return {
		items: CartItems()
	};
};
class Payment {
	CardName: string | undefined;
	CardNo: string | undefined;
	CVC: string | undefined;
	ExpDate: string | undefined;
}
const PaymentSchema = z.object({
	CardName: z
		.string({ required_error: 'Card name must be provided' })
		.min(1, 'Must be at least 1 character')
		.trim(),
	CardNo: z
		.string({ required_error: 'Card number must be provided' })
		.length(16, 'Invalid card number')
		.trim(),
	CVC: z.string({ required_error: 'CVC must be provided' }).length(3, 'Invalid CVC'),
	ExpDate: z.string({ required_error: 'Expire date is empty' }).min(1, 'No date detected').trim()
});
export const Pay: Action = async ({ locals, request }) => {
	const data = await request.formData();
	let pay_obj: Payment = new Payment();
	pay_obj.CardName = data.get('CardName') as string;
	pay_obj.CardNo = data.get('CardNo') as string;
	pay_obj.CVC = data.get('CVC') as string;
	pay_obj.ExpDate = data.get('ExpDate') as string;

	try {
		let result = PaymentSchema.parse(pay_obj);
		console.log('success');
		console.log(result);
	} catch (error) {
		console.log(error);
	} /*
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
	console.log(payment.id);
	return {
		error: false,
		id: payment.id
	};*/
};

export const actions: Actions = { Pay };
