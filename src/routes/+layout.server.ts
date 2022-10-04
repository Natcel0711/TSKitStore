import type { LayoutServerLoad } from './$types'
import { db } from '../lib/database'

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals }) => {
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
    user: locals.user,
    Cart: CartItems()
  }
}
