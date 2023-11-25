<script>
  import { onMount } from "svelte";
  import { supabase } from "$lib/supabase";
  import { format, parseISO } from "date-fns";

  let user = null;

  onMount(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log("Error fetching user:", error);
    } else {
      user = data.user;
    }
  });

  $: console.log(user);

  const formatDateTime = (dateString) => {
    return format(parseISO(dateString), "PPpp");
  };
</script>

{#if user}
  <div class="m-4">
    <p>Email: {user.email}</p>
    <p>
      Email confirmation sent at: {formatDateTime(user.confirmation_sent_at)}
    </p>
    <p>Email confirmed at: {formatDateTime(user.confirmed_at)}</p>
    <p>Email created at: {formatDateTime(user.created_at)}</p>
    <p>Email confirmed at: {formatDateTime(user.email_confirmed_at)}</p>
    <p>Email recovery sent at: {formatDateTime(user.recovery_sent_at)}</p>
    <p>Last Sign in: {formatDateTime(user.last_sign_in_at)}</p>
    <p>Update at: {formatDateTime(user.updated_at)}</p>
    <p>Phone: {user.phone || "n/a"}</p>
    <p>Role: {user.role || "n/a"}</p>
  </div>
{:else}
  <p>Loading user data...</p>
{/if}
