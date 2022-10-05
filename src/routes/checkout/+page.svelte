<script lang="ts">
	export let data;
	const { items } = data;
</script>
<div>
	<h1 class="text-7xl font-mono">Cart Items</h1>
</div>
<div class="stats stats-vertical shadow">
	{#each items as item}
		<div class="stat">
			<div class="place-self-center">
				<img src={item.image}>
			</div>
			<div class="stat-title">{item.name}</div>
			<div class="stat-value">${item.price}</div>
			<div class="stat-desc">{item.description}</div>
		</div>
	{/each}
</div>
<div>
	<a class="btn btn-square w-32 m-4" href="/">Back</a>
	<a class="btn btn-square w-32 m-4">Checkout</a>
</div>
