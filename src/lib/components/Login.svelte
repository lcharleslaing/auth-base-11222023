<script>
  import { supabase } from "$lib/supabase";
  import { goto } from "$app/navigation"; // Import goto for redirection

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message = error.message;
    } else {
      if (data.user) {
        goto("/"); // Adjust the route as needed
      } else {
        message = "Login successful, but unable to retrieve user data.";
      }
    }
  }
</script>

<div class="flex flex-column justify-center">
  <form on:submit|preventDefault={login} class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">Email</span>
    </label>
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      class="input input-bordered w-full max-w-xs"
      required
    />

    <label class="label">
      <span class="label-text">Password</span>
    </label>
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      class="input input-bordered w-full max-w-xs"
      required
    />

    <button type="submit" class="btn btn-primary mt-4">Login</button>

    {#if message}
      <div class="alert alert-info mt-4">
        {message}
      </div>
    {/if}
  </form>
</div>
