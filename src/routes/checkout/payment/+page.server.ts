import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'
export const load: PageServerLoad = async ({ locals }) => {
    const CartItems = async ()=> {
        const items = db.items.findMany(
          {
            where:{
              user:{
                username: locals.user.name
              }
            }
          }
        )
        return items;
      }
      return {
        items: CartItems(),

      }
  }