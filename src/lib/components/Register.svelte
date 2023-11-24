<script>
  import { supabase } from "$lib/supabase";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let message = "";

  async function register() {
    if (password !== confirmPassword) {
      message = "Passwords do not match.";
      return;
    }

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      message = error.message;
    } else {
      message = `Registration successful. Welcome, ${user.email}!`;
    }
  }
</script>

<div class="flex flex-column justify-center">
  <form
    on:submit|preventDefault={register}
    class="form-control w-full max-w-xs"
  >
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

    <label class="label">
      <span class="label-text">Confirm Password</span>
    </label>
    <input
      type="password"
      bind:value={confirmPassword}
      placeholder="Confirm Password"
      class="input input-bordered w-full max-w-xs"
      required
    />

    <button type="submit" class="btn btn-primary mt-4">Register</button>

    {#if message}
      <div class="alert alert-info mt-4">
        {message}
      </div>
    {/if}
  </form>
</div>
