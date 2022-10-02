<script lang="ts">
    import { page } from '$app/stores'

    export let data;
    const {products} = data;
    console.log(products)
</script>
<div class="grid grid-cols-4 gap-2">
{#if $page.data.user}
    {#each products as product}
    <div class="card card-compact w-96 bg-base-100 shadow-xl">
      <figure><img src={product.images[0]} class="h-44" alt="Shoes" /></figure>
      <div class="card-body">
        <h2 class="card-title">{product.title}!</h2>
        <p>{product.description}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    {/each}
  {/if}
</div>


{#if !$page.data.user}
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        <a href="/login" class="btn btn-primary">Get Started</a>
      </div>
    </div>
  </div>
{/if}