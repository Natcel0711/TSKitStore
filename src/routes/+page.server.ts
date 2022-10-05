import type {PageServerLoad} from './$types';
import type { Action, Actions } from './$types'
import {db} from "$lib/database"
import { invalid } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const fetchProducts = async () => {
        const productRes = await fetch('https://dummyjson.com/products?limit=10');
        const productData = await productRes.json();
        return productData.products;
    }

    return{
        products:fetchProducts()
    }
  }

  export const addtocart: Action = async ({ request }) => {
    const data = await request.formData()
    const title = data.get('title')
    const description = data.get('description')
    const image = data.get('image')
    const id = data.get('id')
    const username = data.get('username')
    const price = data.get('price')
    
    
    if(typeof title !== 'string' ||typeof description !== 'string' ||typeof image !== 'string' ||typeof id !== 'string' ||typeof username !== 'string' || typeof price !== 'string'){
        return invalid(400, {user:true})
    }
    const user = await db.user.findUnique({
        where: { username },
      })
      
      if (!user) {
        return invalid(400, { user: true })
      }
    await db.items.create({
        data:{
            name:title,
            description:description,
            image:image,
            price:+price,
            rating:1,
            stock:10,
            user:{connect: {id:user?.id}}
        },
    })

}

export const actions: Actions = { addtocart }