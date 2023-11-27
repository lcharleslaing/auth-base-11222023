<script>
  import { onMount } from "svelte";
  import { HDate } from "@hebcal/core";
  import { DateTime, IANAZone, Duration } from "luxon";
  import Arrow from "./Arrow.svelte";

  let currentHebrewDate;
  let currentTimeInJerusalem;
  let countdown;
  let countdownPercentage;

  // Define the start and target dates
  const targetHebrewYear = 5784; // Example Hebrew year
  const startFromDate = new HDate(12, "Kislev", targetHebrewYear).greg();
  const targetGregorianDate = new Date("2023-12-07T18:00:00"); // Example target Gregorian date

  function updateHebrewDateAndTime() {
    const today = new Date();
    const hDate = new HDate(today);
    currentHebrewDate = hDate.toString("h");

    const jerusalemZone = new IANAZone("Asia/Jerusalem");
    const nowInJerusalem = DateTime.now().setZone(jerusalemZone);
    currentTimeInJerusalem = nowInJerusalem.toFormat("hh:mm:ss a");

    const targetDateTime =
      DateTime.fromJSDate(targetGregorianDate).setZone(jerusalemZone);
    const startDateTime =
      DateTime.fromJSDate(startFromDate).setZone(jerusalemZone);

    if (nowInJerusalem < targetDateTime) {
      const totalDuration = targetDateTime.diff(startDateTime);
      const elapsedDuration = nowInJerusalem.diff(startDateTime);
      countdown = Duration.fromMillis(
        targetDateTime.diff(nowInJerusalem),
      ).toFormat("dd'd' hh'h' mm'm' ss's'");
      countdownPercentage = Math.min(
        (elapsedDuration / totalDuration) * 100,
        100,
      ).toFixed(2);
    } else {
      countdown = "The target date has passed";
      countdownPercentage = "100";
    }
  }

  onMount(() => {
    updateHebrewDateAndTime();
    const interval = setInterval(updateHebrewDateAndTime, 1000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="flex items-center justify-center w-screen h-screen bg-cover bg-center"
  style="background-image: url('/rapture.png');"
>
  <div class="flex flex-col items-center justify-center space-y-1 m-4 z-0">
    <div
      class="w-full xs:w-80 shadow-md text-center card bg-slate-900 bg-opacity-90 m-1 p-2 text-slate-100 font-extrabold z-20"
    >
      <h1>Jerusalem</h1>
      <div class="text-5xl">{currentHebrewDate}</div>
      <div class="text-4xl">
        {currentTimeInJerusalem}
      </div>
    </div>

    <div
      class="w-full xs:w-80 shadow-md text-center card bg-slate-900 bg-opacity-90 m-2 p-2 text-slate-100 font-extrabold z-20"
    >
      <div>Countdown to...</div>
      <h1 class="text-5xl">24 Kislev {targetHebrewYear}</h1>
      <div class="text-4xl text-slate-100">
        {countdown} ({countdownPercentage}%)
      </div>
    </div>
  </div>
  <!-- Inside your Svelte file where you use the Arrow component -->
  <Arrow strokeWidth={2} fillPercentage={countdownPercentage} opacity={0.5} />
</div>
