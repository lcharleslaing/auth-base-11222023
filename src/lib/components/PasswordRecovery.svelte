<script>
  import { supabase } from "$lib/supabase";
  export let onRecoveryComplete;

  let email = "";
  let message = "";
  let isError = false;

  async function recoverPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.log("Error in password recovery: PW RECOVRY", error);
      message = error.message;
      isError = true;
    } else {
      message = "Password recovery email sent. Please check your email.";
      isError = false;
      onRecoveryComplete(); // Call the callback function
    }
  }
</script>

<!-- Your form HTML here -->

<div class="flex flex-column justify-center m-4">
  <form
    on:submit|preventDefault={recoverPassword}
    class="form-control w-full max-w-xs"
  >
    <label class="label">
      <span class="label-text">Enter your email to recover your password</span>
    </label>
    <input
      type="email"
      bind:value={email}
      class="input input-bordered w-full max-w-xs"
      required
    />

    <button type="submit" class="btn btn-primary mt-4">Recover Password</button>

    {#if message}
      <div class={error ? "alert alert-error" : "alert alert-success"} mt-4>
        {message}
      </div>
    {/if}
  </form>
</div>
