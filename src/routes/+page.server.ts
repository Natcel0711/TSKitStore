import type {PageServerLoad} from './$types';
import type { Action, Actions } from './$types'
import type { Checkout } from '$lib/models/Product';
import {db} from "$lib/database"
import { invalid } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const fetchProducts = async () => {
        const productRes = await fetch('https://dummyjson.com/products?limit=30');
        const productData = await productRes.json();
        return productData.products;
    }

    return{
        products:fetchProducts()
    }
  }
  export const addtocart: Action = async ({ request }) => {
    const data = await request.formData()
    let item:Checkout = await MapData(data);
    const username = data.get('username')
    
    if(typeof item.name !== 'string' ||typeof item.description !== 'string' ||typeof item.image !== 'string' ||typeof item.id !== 'string' ||typeof username !== 'string' || typeof item.price !== 'string'){
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
            name:item.name,
            description:item.description,
            image:item.image,
            price:+item.price,
            rating:item.rating,
            stock:item.stock,
            user:{connect: {id:user?.id}},
        },
    })

}

async function MapData(data:any){
    let product:Checkout = {
        name: data.get('title'),
        description: data.get('description'),
        image: data.get('image'),
        id: data.get('id'),
        price: data.get('price'),
        stock: 10,
        rating:5,
        userid:""
    }
    return product;
}

export const actions: Actions = { addtocart }