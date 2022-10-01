<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import { invalidateAll } from '$app/navigation'
  
    // ...
  </script>
  
  <!-- ... -->
  
  <form
    action="/logout"
    method="POST"
    use:enhance={() => {
      return async ({ result }) => {
        invalidateAll()
        await applyAction(result)
      }
    }}
  >
    <button type="submit">Log out</button>
  </form>
  