<script>
  import { supabase } from "$lib/supabase"; // Adjust path as needed

  async function logout() {
    await supabase.auth.signOut();
    // Redirect or update UI after logout
  }
</script>

<div class="flex justify-center">
  <button on:click={logout} class="btn btn-secondary mt-4">Logout</button>
</div>
