<script>
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation";

  async function logout() {
    await supabase.auth.signOut();
    goto("/auth"); // Adjust the route as needed
  }
</script>

<div class="flex justify-center">
  <button on:click={logout} class="btn btn-secondary mt-4">Logout</button>
</div>
