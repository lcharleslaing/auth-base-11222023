<!-- src/lib/components/HebrewClock.svelte -->
<script>
  import { onMount } from "svelte";
  import { HDate } from "@hebcal/core";
  import { DateTime, IANAZone } from "luxon";

  let currentHebrewDate;
  let currentTimeInJerusalem;

  function updateHebrewDateAndTime() {
    const today = new Date();
    const hDate = new HDate(today);
    currentHebrewDate = hDate.toString("h");

    const jerusalemZone = new IANAZone("Asia/Jerusalem");
    currentTimeInJerusalem = DateTime.now()
      .setZone(jerusalemZone)
      .toFormat("hh:mm:ss a");
  }

  onMount(() => {
    updateHebrewDateAndTime();
    const interval = setInterval(updateHebrewDateAndTime, 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="hebrew-clock text-center">
  {currentHebrewDate}
  <br />
  {currentTimeInJerusalem}
</div>

<style>
  .hebrew-clock {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.2em;
    color: #333;
  }
</style>
