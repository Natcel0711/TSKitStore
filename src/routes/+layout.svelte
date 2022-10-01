<script lang="ts">
    import { page } from '$app/stores';
    import "../app.css";
  </script>
  
  <svelte:head>
    <title>Octun</title>
  </svelte:head>

  <div class="navbar bg-base-100">
    {#if !$page.data.user}
      <a class="btn btn-ghost normal-case text-xl" href="/login">Login</a>
      <a class="btn btn-ghost normal-case text-xl" href="/register">Register</a>
    {/if}
  
    {#if $page.data.user}
    {#if $page.data.user.role === 'ADMIN'}
    <a class="btn btn-ghost normal-case text-xl" href="/admin">Admin</a>
    {/if}
    
      <form action="/logout" method="POST">
        <button type="submit" class="btn btn-ghost normal-case text-xl">Logout</button>
      </form>
    {/if}
</div>
  
  <main class="grid grid-cols-1 text-center">
    <slot />
  </main>
  