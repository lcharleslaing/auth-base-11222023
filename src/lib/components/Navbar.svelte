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
