## File: lib\components\AppName.svelte

```
<script>
  export let appname = import.meta.env
    ? import.meta.env.VITE_APPNAME
    : "(.env) VITE_APPNAME=YourName)";
</script>

<span>{appname}</span>

```

## File: lib\components\Login.svelte

```
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

```

## File: lib\components\Logout.svelte

```
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

```

## File: lib\components\MenuLinks.svelte

```
<script>
  export let menuItems = [];
</script>

<!-- Smaller Screens: Original Dropdown Menu -->
<div class="lg:hidden">
  <ul class="menu">
    {#each menuItems as menuItem}
      <li>
        <a href={menuItem.href}>{menuItem.title}</a>
        {#if menuItem.submenu}
          <ul class="p-2">
            {#each menuItem.submenu as submenuItem}
              <li><a href={submenuItem.href}>{submenuItem.title}</a></li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<!-- Larger Screens: Horizontal Menu with Dropdowns
<div class="hidden lg:block">
  <ul class="menu menu-horizontal px-1">
    {#each menuItems as menuItem}
      <li tabindex="0">
        <a href={menuItem.href}>{menuItem.title}</a>
        {#if menuItem.submenu}
          <details>
            <summary>{menuItem.title}</summary>
            <ul class="p-2">
              {#each menuItem.submenu as submenuItem}
                <li><a href={submenuItem.href}>{submenuItem.title}</a></li>
              {/each}
            </ul>
          </details>
        {/if}
      </li>
    {/each}
  </ul>
</div> -->

<!-- Larger Screens: Horizontal Menu with Dropdowns -->
<div class="hidden lg:block">
  <ul class="menu menu-horizontal px-1">
    {#each menuItems as menuItem}
      {#if menuItem.submenu}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <li tabindex="0">
          <details>
            <summary>{menuItem.title}</summary>
            <ul class="p-2">
              {#each menuItem.submenu as submenuItem}
                <li><a href={submenuItem.href}>{submenuItem.title}</a></li>
              {/each}
            </ul>
          </details>
        </li>
      {:else}
        <li><a href={menuItem.href}>{menuItem.title}</a></li>
      {/if}
    {/each}
  </ul>
</div>

```

## File: lib\components\Navbar.svelte

```
<script>
  import AppName from "./AppName.svelte";
  import MenuLinks from "./MenuLinks.svelte";
  export const appname = import.meta.env
    ? import.meta.env.VITE_APPNAME
    : "DefaultAppName";

  const menuItems = [
    { title: "Home", href: "/" },
    {
      title: "Auth",
      href: "/auth", // Updated to a placeholder since it has a submenu
      submenu: [
        { title: "Register", href: "/auth" }, // Link to your Register page
        { title: "Signin", href: "/auth" }, // Link to your Login page
        { title: "Logout", href: "/auth" }, // Link to your Logout page
        { title: "Profile", href: "/auth/profile" }, // Link to your Logout page
      ],
    },
    // {
    //   title: "Lee's Time",
    //   href: "#", // Updated to a placeholder since it has a submenu
    //   submenu: [
    //     { title: "Physical Work", href: "/physical-work" },
    //     { title: "Brain Work", href: "/brain-work" },
    //     { title: "Rates", href: "/rates" },
    //     { title: "Categories", href: "/categories" },
    //   ],
    // },
    // { title: "Bible Ask Help", href: "/help/bible-ask" },
  ];
</script>

<div class="navbar bg-base-100 shadow">
  <div class="navbar-start">
    <div class="dropdown">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <MenuLinks {menuItems} />
      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl"><AppName /></a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <MenuLinks {menuItems} />
  </div>
  <div class="navbar-end">
    <a href="/" class="btn">Share</a>
  </div>
</div>

```

## File: lib\components\PasswordRecovery.svelte

```
<script>
  import { supabase } from "$lib/supabase";
  import { writable } from "svelte/store";

  export const recoveryComplete = writable(false);

  let email = "";
  let message = "";
  let isError = false;

  async function recoverPassword() {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      message = error.message;
      isError = true;
    } else {
      message = "Password recovery email sent. Please check your email.";
      isError = false;
      recoveryComplete.set(true); // Update the store to indicate completion
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

```

## File: lib\components\Register.svelte

```
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

```

## File: lib\index.js

```
// place files you want to import through the `$lib` alias in this folder.

```

## File: lib\stores.js

```
import { writable } from 'svelte/store';

export const user = writable(null);

```

## File: lib\supabase.js

```
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

```

## File: routes\+layout.svelte

```
<script>
  import "../app.pcss";
  import Navbar from "../lib/components/Navbar.svelte";
</script>

<Navbar />
<slot />

```

## File: routes\+page.svelte

```
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

```

## File: routes\auth\+page.svelte

```
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

```

## File: routes\auth\profile\+page.svelte

```
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

```

