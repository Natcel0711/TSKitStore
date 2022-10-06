<script lang="ts">
    import { page } from '$app/stores';
    import type {Checkout} from "$lib/models/Product"
    import "../app.css";
    export let data;

    let total:number = 0;
    let itemscount:number = 0;

    async function CartTotal(items:Array<Checkout>){
      if(items !== undefined){
        for (let i = 0; i < items.length; i++) {
        itemscount += 1;
        total = total + items[i].price;
      }
      }
    }

    CartTotal(data.Cart);
  </script>
  
  <svelte:head>
    <title>Octun</title>
  </svelte:head>

<div class="navbar bg-neutral">
  <div class="flex-1">
    {#if $page.data.user}
    {#if $page.data.user.role === 'ADMIN'}
    <a class="btn btn-ghost normal-case text-xl" href="/admin">Admin</a>
    {/if}
    <form action="/logout" method="POST">
      <button type="submit" class="btn text-slate-300 btn-ghost normal-case text-xl">Logout</button>
    </form>
    {/if}
    {#if !$page.data.user}
      <a class="btn btn-ghost normal-case text-xl" href="/login">Login</a>
      <a class="btn btn-ghost normal-case text-xl" href="/register">Register</a>
    {/if}
  </div>
  {#if $page.data.user}
  <div class="flex-none">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" style="fill: white;" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span class="badge badge-sm bg-primary indicator-item">{itemscount}</span>
        </div>
      </label>
      <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div class="card-body">
          <span class="font-bold text-lg">{itemscount} Items</span>
          <span class="text-info">Subtotal: ${total}</span>
          <div class="card-actions">
            <a href="/checkout" class="btn btn-primary btn-block">View cart</a>
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
  {/if}
</div>
  
  <main class="grid grid-cols-1 text-center">
    <slot />
  </main>