import type {PageServerLoad} from './$types';
import type { Action, Actions } from './$types'
import {db} from "$lib/database"

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

    
}

export const actions: Actions = { addtocart }