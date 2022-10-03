import type {PageServerLoad} from './$types'

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