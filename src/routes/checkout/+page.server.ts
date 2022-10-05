import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'
import { invalid } from '@sveltejs/kit'

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

export const removeItem:Action = async ({request})=>{
  const data = await request.formData();
  const itemid = data.get('id')
  console.log(typeof itemid)
  if(typeof itemid !== 'string')
    return invalid(400, {user:true})
  
  await db.items.delete(
    {
      where:{
        id:+itemid
      }
    }
  )
}

export const actions: Actions = { removeItem }