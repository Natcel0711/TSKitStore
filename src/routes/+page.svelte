<script lang="ts">
	import { page } from '$app/stores';
	import { ModalProduct } from '$lib/models/ModalModel';
	let producto: ModalProduct = new ModalProduct();
	export let data;
	let categories:any = [];
	const { products } = data;
	async function GetCategories(items:any){
		for (let i = 0; i < items.length; i++) {
			if(!categories.includes(items[i].category)){
				categories.push(items[i].category)
			}
		}
	}
	function MapProductModal(id: number) {
		for (let i = 0; i < products.length; i++) {
			if (products[i].id == id) {
				producto.id = products[i].id;
				producto.title = products[i].title;
				producto.description = products[i].description;
				producto.image = products[i].images[0];
				producto.price = products[i].price;
			}
		}
	}
	GetCategories(products)
</script>

{#if $page.data.user}
	<div class="bg-white">
		<div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
			<h2 class="sr-only">Products</h2>
			{#each categories as cat}
			<h1 class="text-6xl mb-10">{cat}</h1>
			<div
				class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
			>
			
				 
				 {#each products as product}
				 {#if cat == product.category}
				 <a href="#my-modal-2" on:click={() => MapProductModal(product.id)} class="group">
					<div
						class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
					>
						<img
							src={product.images[0]}
							alt={product.description}
							class="h-60 w-full object-fill object-center group-hover:opacity-75"
						/>
					</div>
					<h3 class="mt-4 text-sm text-gray-700">{product.title}</h3>
					<p class="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
				</a>
				 {/if}
				{/each}
			
			</div>
			{/each}
		</div>
	</div>
{/if}

{#if !$page.data.user}
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Hello there</h1>
				<p class="py-6">
					Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
					exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
				</p>
				<a href="/login" class="btn btn-primary">Get Started</a>
			</div>
		</div>
	</div>
{/if}

<div class="modal" id="my-modal-2">
	<form action="?/addtocart" method="post">
		<input id="username" value={$page.data.user?.name} name="username" class="hidden" type="text">
		<input id="price" value={producto.price} name="price" class="hidden" type="text">
		<input id="id" value={producto.id} name="id" class="hidden" type="text">
		<input id="title" value={producto.title} name="title" class="hidden" type="text">
		<input id="description" value={producto.description} name="description" class="hidden" type="text">
		<input id="image" value={producto.image} name="image" class="hidden" type="text">
	<div class="modal-box p-12">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" class="btn btn-sm btn-circle absolute right-2 top-2">✕</a>
		<img src={producto.image} alt={producto.description} />
		<h3 class="font-bold text-lg">{producto.title}!</h3>
		<h2 class="font-bold text-lg">${producto.price}</h2>
		<p  class="py-4">{producto.description}!</p>
		<div class="modal-action">
			<button type="submit" class="btn">Add to cart!</button>
		</div>
	</div>
	</form>
</div>
<footer class="footer footer-center p-4 bg-neutral text-slate-200">
    <div>
      <p>OCTUN</p>
    </div>
  </footer>