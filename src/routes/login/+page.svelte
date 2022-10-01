<script lang="ts">
    import type { ActionData } from './$types'
  
    export let form: ActionData
  </script>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form action="?/login" method="POST">
        <div class="card-body">
          <div class="form-control">
            <label for="username" class="label">
              <span class="label-text">Username</span>
            </label>
            <input id="username" placeholder="Username" name="username" type="text" required class="input input-bordered" />
          </div>
          <div class="form-control">
            <label for="password" class="label">
              <span class="label-text">Password</span>
            </label>
            <input id="password" placeholder="Password" name="password" type="password" required class="input input-bordered" />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          {#if form?.invalid}
            <p class="error">Username and password is required.</p>
          {/if}
        
          {#if form?.credentials}
            <p class="error">You have entered the wrong credentials.</p>
          {/if}
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  </div>
  