<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import { user } from "$lib/stores";
  import AppName from "$lib/components/AppName.svelte";
  let showPasswordRecovery = false;

  onMount(() => {
    user.set(supabase.auth.getUser());
    supabase.auth.onAuthStateChange((_event, session) => {
      user.set(session?.user || null);
    });
  });

  $: console.log("Current user: AUTH", $user);
</script>

<!-- Auth Forms -->
<div class="">
  <main>
    <h1 class="text-3xl text-center my-4 font-extrabold">
      <AppName />
    </h1>
  </main>
</div>
