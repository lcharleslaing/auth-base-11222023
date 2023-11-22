<script>
  import { supabase } from "$lib/supabase"; // Adjust path as needed

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    console.log("Attempting to log in LOGIN:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Login error LOGIN:", error);
      message = error.message;
    } else {
      const user = data.user;
      if (user) {
        console.log("Login successful LOGIN:", user);
        message = `Login successful. Welcome back, ${user.email}!`;
      } else {
        console.log("Login successful, but user data is undefined. LOGIN");
        message = "Login successful, but unable to retrieve user data. LOGIN";
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
