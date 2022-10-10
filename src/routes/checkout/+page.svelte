<script lang="ts">
	export let data;
	const { items } = data;
	console.log(items)
</script>

{#if items.length < 1}
	<h1>Cart empty...</h1>
	<div>
		<a class="btn btn-square w-32 m-4" href="/">Go home</a>
	</div>
{:else}
	<div>
		<h1 class="text-7xl font-sans m-4">Cart Items</h1>
	</div>
	<div class="overflow-x-auto m-10">
		<table class="table w-full">
			<tbody>
				{#each items as item}
					<tr>
						<th><img src={item.image} alt={item.description} /></th>
						<td class="text-3xl text-primary">{item.name}</td>
						<td class="">{item.description}</td>
						<td class="text-3xl text-primary">${item.price}</td>
						<td>
							<form action="?/removeItem" method="POST">
								<input id="id" value={item.id} name="id" class="hidden" type="text" />
								<button class="btn btn-square">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12"
										/></svg
									>
								</button>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div>
		<a class="btn btn-square w-32 m-4" href="/">Back</a>
		<a class="btn btn-square w-32 m-4" href="checkout/payment">Checkout</a>
	</div>
{/if}
