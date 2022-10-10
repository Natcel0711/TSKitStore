<script lang="ts">
	import PaymentReceipt from "$lib/components/PaymentReceipt.svelte";

	export let data;
	const { items } = data;
	export let form:string;
	console.log(form)
	let paymentID:string = form

</script>

{#if form}
	<PaymentReceipt ID={paymentID}/>
{:else}
{#if items.length < 1}
	 <h1>Cart empty...</h1>
{:else}
<div>
	<div class="m-2">
		<h1 class="text-5xl">Payment</h1>
	</div>
	<div class="grid grid-cols-2 gap-1" style="margin-right: 4rem;">
		<div class="grid grid-cols-1 gap-2 justify-items-center">
			<h1 class="text-3xl">Card details</h1>
			<form action="?/Pay" id="PaymentForm" method="POST">
				<div class="form-control">
					<label class="label">
						<span class="label-text">Card Number</span>
					</label>
					<label class="input-group">
						<span>#</span>
						<input type="text" placeholder="4242 4242 4242 4242" class="input input-bordered"/>
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
			</form>
		</div>
		<div class="border border-l-stone-400">
			<h1 class="text-3xl">Cart</h1>
			<table class="table w-full">
				<tbody>
					{#each items as item}
						<tr>
							<th><img src={item.image} alt={item.description} /></th>
							<td class="text-3xl">{item.name}</td>
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
				<div>
					<a class="btn btn-square w-32 m-4" href="/checkout">Back</a>
					<button form="PaymentForm" class="btn btn-square w-32 m-4 bg-primary">Pay</button>
				</div>
		</div>
	</div>
</div>
{/if}
{/if}