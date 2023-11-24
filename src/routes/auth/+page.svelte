<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import { user } from "$lib/stores";
  import Register from "$lib/components/Register.svelte";
  import Login from "$lib/components/Login.svelte";
  import Logout from "$lib/components/Logout.svelte";
  import PasswordRecovery from "$lib/components/PasswordRecovery.svelte";
  import AppName from "$lib/components/AppName.svelte";
  let showPasswordRecovery = false;

  onMount(() => {
    user.set(supabase.auth.getUser());
    supabase.auth.onAuthStateChange((_event, session) => {
      user.set(session?.user || null);
    });
  });

  $: console.log("Current user: MAIN PAGE", $user);

  function togglePasswordRecovery() {
    showPasswordRecovery = !showPasswordRecovery;
  }

  function handleRecoveryComplete() {
    showPasswordRecovery = false;
  }
</script>

<!-- Auth Forms -->
<div class="">
  <main>
    <h1 class="text-3xl text-center my-4 font-extrabold">
      <AppName />
    </h1>

    {#if $user}
      <section>
        <h2>Logout</h2>
        <Logout />
      </section>
    {:else}
      <section>
        <h2>Register</h2>
        <Register />
      </section>

      <section>
        <h2>Login</h2>
        <Login />
      </section>

      <div class="flex flex-column justify-center my-4">
        <button on:click={togglePasswordRecovery} class="btn btn-primary">
          Forgot Password?
        </button>
      </div>

      {#if showPasswordRecovery}
        <section>
          <h2>Recover Password</h2>
          <PasswordRecovery onRecoveryComplete={handleRecoveryComplete} />
        </section>
      {/if}
    {/if}
  </main>
</div>

<style>
  h2 {
    margin-top: 2rem;
    text-align: center;
    font-weight: bolder;
    font-size: x-large;
  }
</style>
