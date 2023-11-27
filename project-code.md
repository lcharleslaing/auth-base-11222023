## File: lib\components\BibleVerses.svelte

```
<script>
</script>

<div class="overflow-y-auto text-center font-serif my-2 px-3">
  <div class="card w-96 bg-slate-100 bg-opacity-60 p-3 mx-auto rounded-2xl">
    <!-- This is to be pulled from the database on supabase -->
    <div class="text-left font-bold">Genesis 22:18</div>
    <div class="text-justify">
      And in thy seed shall all the nations of the earth be blessed; because
      thou hast obeyed my voice.
    </div>
  </div>
</div>

```

## File: lib\components\IsraelTime.svelte

```
<script>
  import { onMount, onDestroy } from "svelte";
  import moment from "moment-timezone";
  import YouTubeVideo from "./YouTubeVideo.svelte";
  import BibleVerses from "./BibleVerses.svelte";

  let currentTime = { day: "", month: "", year: "", time: "" };
  let jewishDate = { day: "", month: "", year: "" };
  let countdownToSunrise = "";
  let countdownToSunset = "";
  let timeInterval; // Interval for updating time every second
  let dateInterval; // Interval for updating Jewish date every hour

  // Define the constant end date for the countdown
  const countdownEndDate = moment("2023-12-07 16:35:00"); // Replace with your end date and time

  // Update the time every second
  function updateTime() {
    const timeInJerusalem = moment().tz("Asia/Jerusalem");
    currentTime.time = timeInJerusalem.format("hh:mm:ss a");
    currentTime.day = timeInJerusalem.format("DD");
    currentTime.month = timeInJerusalem.format("MMMM");
    currentTime.year = timeInJerusalem.format("YYYY");
  }

  async function fetchJewishDate() {
    const gregorianToday = moment().tz("Asia/Jerusalem");
    const response = await fetch(
      `https://www.hebcal.com/converter?cfg=json&gy=${gregorianToday.format(
        "YYYY",
      )}&gm=${gregorianToday.format("MM")}&gd=${gregorianToday.format(
        "DD",
      )}&g2h=1&lg=s`,
    );
    const data = await response.json();
    jewishDate.day = data.hd;
    jewishDate.month = data.hm;
    jewishDate.year = data.hy;
  }

  async function fetchSunriseSunsetTimes() {
    const today = moment().tz("Asia/Jerusalem").format("YYYY-MM-DD");
    const apiUrl = `https://www.hebcal.com/hebcal?v=1&cfg=json&c=on&geo=pos&latitude=[YOUR_LATITUDE]&longitude=[YOUR_LONGITUDE]&tzid=[YOUR_TIMEZONE]&start=${today}&end=${today}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract sunrise and sunset times and adjust them to the end date
    const sunriseTime = countdownEndDate.clone().set({
      hour: moment("06:00", "HH:mm").hour(),
      minute: moment("06:00", "HH:mm").minute(),
    });
    const sunsetTime = countdownEndDate.clone().set({
      hour: moment("18:00", "HH:mm").hour(),
      minute: moment("18:00", "HH:mm").minute(),
    });

    setInterval(() => {
      const now = moment();
      countdownToSunrise = formatCountdown(now, sunriseTime);
      countdownToSunset = formatCountdown(now, sunsetTime);
    }, 1000);
  }

  function formatCountdown(currentTime, eventTime) {
    const duration = moment.duration(eventTime.diff(currentTime));
    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  }

  onMount(() => {
    updateTime();
    fetchJewishDate();
    fetchSunriseSunsetTimes();
    timeInterval = setInterval(updateTime, 1000); // Update time every second
    dateInterval = setInterval(fetchJewishDate, 1000 * 60 * 60); // Update Jewish date every hour
  });

  onDestroy(() => {
    clearInterval(timeInterval);
    clearInterval(dateInterval);
  });
</script>

<!-- HTML layout -->
<div
  class="flex flex-col w-screen h-screen bg-cover bg-center"
  style="background-image: url('/rapture.png');"
>
  <!-- Placeholder div for the Video above the clock -->
  <div class="flex-grow"></div>

  <!-- Clock, Date, and Countdowns -->
  <div class="flex flex-grow-0 justify-center items-center text-4xl">
    <div class="card bg-slate-50 bg-opacity-60 p-3 shadow-lg rounded-2xl">
      <!-- Jewish Date -->
      <div class="text-center font-serif m-1 mb-4">
        <div class="jewish-date-day">{jewishDate.day}</div>
        <div class="jewish-date-month">{jewishDate.month}</div>
        <div class="jewish-date-year">{jewishDate.year}</div>
      </div>
      <hr />

      <!-- Gregorian Date -->
      <div class="text-center font-serif mb-4">
        <div class="gregorian-date-day">{currentTime.day}</div>
        <div class="gregorian-date-month">{currentTime.month}</div>
        <div class="gregorian-date-year">{currentTime.year}</div>
      </div>
      <hr />

      <!-- Current Time -->
      <div class="time text-center font-serif">{currentTime.time}</div>
      <hr />

      <!-- Countdown to Sunrise and Sunset -->
      <div class="text-center font-serif">
        <div>Day End: {countdownToSunrise}</div>
        <div>Day Start: {countdownToSunset}</div>
      </div>
    </div>
  </div>

  <!-- Placeholder div for the Bible verse below the clock -->
  <div class="flex-grow"></div>
</div>

<!-- Styles remain the same -->

<style>
  .jewish-date-day {
    /* styles for Jewish date day */
    font-size: 75px;
    line-height: normal;
  }
  .jewish-date-month {
    /* styles for Jewish date month */
    font-size: 75px;
    line-height: normal;
  }
  .jewish-date-year {
    /* styles for Jewish date year */
    font-size: 75px;
    line-height: normal;
  }

  .gregorian-date-day {
    /* styles for Gregorian date day */
    font-size: 75px;
    line-height: normal;
  }
  .gregorian-date-month {
    /* styles for Gregorian date month */
    font-size: 75px;
    line-height: normal;
  }
  .gregorian-date-year {
    /* styles for Gregorian date year */
    font-size: 75px;
    line-height: normal;
  }
  .time {
    /* styles for Gregorian date year */
    font-size: 75px;
    line-height: normal;
  }
</style>

```

## File: lib\components\JewishCountdown.svelte

```
<script>
  import { onMount } from "svelte";

  let Hebcal, HDate;
  let targetDate;
  let timeLeft = "Loading...";

  onMount(() => {
    loadHebcal().then(() => {
      initializeCountdown();
      startCountdown();
    });
  });

  async function loadHebcal() {
    if (typeof window !== "undefined") {
      const hebcalModule = await import("hebcal");
      Hebcal = hebcalModule.Hebcal;
      HDate = hebcalModule.HDate;
    }
  }

  function getGregorianDateForJewish(jewishYear, jewishMonth, jewishDay) {
    const jewishDate = new HDate(jewishDay, jewishMonth, jewishYear);
    return jewishDate.greg();
  }

  function initializeCountdown() {
    const currentJewishYear = new HDate().getFullYear();
    targetDate = getGregorianDateForJewish(currentJewishYear, 9, 24);
  }

  function startCountdown() {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        timeLeft = `${hours}h ${minutes}m ${seconds}s`;
      } else {
        timeLeft = "The day has arrived!";
        clearInterval(interval);
      }
    }, 1000);
  }
</script>

<h1>Countdown to 9/24 Jewish Date: {timeLeft}</h1>

```

## File: lib\components\NewIsraelTime.svelte

```
<script>
  import { onMount, onDestroy } from "svelte";
  import moment from "moment-timezone";

  let currentTime = { day: "", month: "", year: "", time: "" };
  let countdownToStart = "";
  let countdownToEnd = "";
  let timeInterval;

  async function fetch924SunsetTimes() {
    // Adjust the year as needed. This fetches the entire year's data.
    const apiUrl = `https://www.hebcal.com/hebcal?v=1&cfg=json&c=on&geo=pos&latitude=31.7683&longitude=35.2137&tzid=Asia/Jerusalem&year=2023`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("API response:", data); // Debug: Log the API response

      // Process the data to find sunset times for the Jewish date 9/24
      // Since the structure of the data and the way to identify 9/24 is unclear, this part is left for further implementation
      // ...
    } catch (error) {
      console.error("Error fetching sunset times:", error);
    }
  }

  function updateCurrentJewishDate() {
    const now = moment().tz("Asia/Jerusalem");
    currentTime.time = now.format("HH:mm:ss A");
    currentTime.day = now.format("DD");
    currentTime.month = now.format("MMMM");
    currentTime.year = now.format("YYYY");
  }

  function calculateCountdown() {
    // This function should be updated once startOf924 and endOf924 are correctly determined
    // ...
  }

  function formatCountdown(currentTime, eventTime) {
    const duration = moment.duration(eventTime.diff(currentTime));
    return `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;
  }

  onMount(() => {
    fetch924SunsetTimes();
    updateCurrentJewishDate();
    timeInterval = setInterval(() => {
      updateCurrentJewishDate();
      // calculateCountdown(); // Uncomment this once startOf924 and endOf924 are set
    }, 1000); // Update every second
  });

  onDestroy(() => {
    clearInterval(timeInterval);
  });
</script>

<div class="flex flex-col w-screen h-screen">
  <div class="flex-grow"></div>

  <div class="flex flex-grow-0 justify-center items-center">
    <div class="card">
      <div class="text-center">
        Current Time in Jerusalem: {currentTime.time}
        <br />
        Date: {currentTime.day}
        {currentTime.month}
        {currentTime.year}
      </div>
      <hr />

      <div class="text-center">
        <div>Countdown to Start of 9/24: {countdownToStart}</div>
        <div>Countdown to End of 9/24: {countdownToEnd}</div>
      </div>
    </div>
  </div>

  <div class="flex-grow"></div>
</div>

```

## File: lib\components\YouTubeVideo.svelte

```
<script>
</script>

<div class="overflow-y-auto text-center font-serif my-2 px-3">
  <!-- This needs to hold a youtube video -->
  <div class="">
    <div>Genesis 22:18</div>
    <div>
      And in thy seed shall all the nations of the earth be blessed; because
      thou hast obeyed my voice.
    </div>
  </div>
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
</script>

<slot />

```

## File: routes\+page.svelte

```
<script>
  import IsraelTime from "../lib/components/IsraelTime.svelte";
  import JewishCountdown from "../lib/components/JewishCountdown.svelte";
  import NewIsraelTime from "../lib/components/NewIsraelTime.svelte";
</script>

<!-- Auth Forms -->
<div class="">
  <section>
    <!-- <IsraelTime /> -->
    <!-- <NewIsraelTime /> -->
    <JewishCountdown />
  </section>
</div>

```

