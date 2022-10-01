<script lang="ts">
    import { page } from '$app/stores'
</script>

{#if $page.data.user}
<div class="card lg:card-side bg-base-100 shadow-xl">
    <figure><img src="https://placeimg.com/400/400/arch" alt="Album"/></figure>
    <div class="card-body">
      <h2 class="card-title">New album is released!</h2>
      <p>Click the button to listen on Spotiwhy app.</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Listen</button>
      </div>
    </div>
  </div>
  {/if}


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