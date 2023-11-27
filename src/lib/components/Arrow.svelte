<!-- src/lib/components/Arrow.svelte -->
<script>
  export let strokeWidth = 2;
  export let fillPercentage = 0;
  export let opacity = 1;
</script>

<svg
  class="arrow"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
  style={`opacity: ${opacity};`}
>
  <defs>
    <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:orange; stop-opacity:1" />
      <stop
        offset="{fillPercentage}%"
        style="stop-color:orange; stop-opacity:1"
      />
      <stop
        offset="{fillPercentage}%"
        style="stop-color:transparent; stop-opacity:0"
      />
    </linearGradient>
    <mask id="arrowMask">
      <polygon points="50,10 90,90 50,70 10,90" fill="url(#arrowGradient)" />
    </mask>
  </defs>

  <!-- Filled Polygon -->
  <polygon points="50,10 90,90 50,70 10,90" fill="url(#arrowGradient)" />

  <!-- Outlined Polygon -->
  <polygon
    points="50,10 90,90 50,70 10,90"
    fill="none"
    stroke="black"
    stroke-width={strokeWidth}
  />
</svg>

<style>
  .arrow {
    position: absolute;
    bottom: 0;
    height: 100vh;
    width: 100%;
    z-index: 10;
  }
</style>
