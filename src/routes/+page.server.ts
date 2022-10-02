import type {PageServerLoad} from './$types'
import fetch from 'node-fetch';

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