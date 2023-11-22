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
