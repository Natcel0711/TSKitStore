<script lang="ts">
	export let data;
	const { items } = data;
</script>

{#if !items}
	<p>Cart empty...</p>
{:else}
	<div>
		<div class="m-2">
			<h1 class="text-5xl">Payment</h1>
		</div>
		<div class="grid grid-cols-2 gap-1" style="margin-right: 4rem;">
			<div class="grid grid-cols-1 gap-2 justify-items-center">
				<h1 class="text-3xl">Card details</h1>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Card Number</span>
					</label>
					<label class="input-group">
						<span>#</span>
						<input type="text" placeholder="4242 4242 4242 4242" class="input input-bordered" />
					</label>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Exp. date</span>
					</label>
					<label class="input-group">
						<span>abc</span>
						<input type="text" placeholder="MM/YY" class="input input-bordered" />
					</label>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">CVC Number</span>
					</label>
					<label class="input-group">
						<span>#</span>
						<input type="text" placeholder="CVC" class="input input-bordered" />
					</label>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Name in card</span>
					</label>
					<label class="input-group">
						<span>abc</span>
						<input type="text" class="input input-bordered" />
					</label>
				</div>
			</div>
			<div class="border border-l-stone-400">
				<h1 class="text-3xl">Cart</h1>
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
				<form action="?/Pay" method="POST">
					<div>
						<button class="btn bg-primary">Pay</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}
