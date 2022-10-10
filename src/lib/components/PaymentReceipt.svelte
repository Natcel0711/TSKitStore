<script lang="ts">
    export let ID:String
</script>
<div style="text-align: -moz-center;">
    <div>
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <image href="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" height="200" width="200" />
          </svg> 
    </div>
    <div>
        <h1 class="text-4xl">Payment successful!</h1>
        <h1 class="text-2xl m-2">Receipt ID: <strong class="text-primary">{ID}</strong></h1>
    </div>
    <div>
        <a class="btn btn-square w-32 m-4" href="/">Home page</a>
    </div>
</div>