<script lang="ts">
  type ActivityType = "workout" | "timer";

  interface Activity {
    id: string;
    title: string;
    type: ActivityType;
    date: string; // ISO date string
  }

  // Placeholder data source: currently empty
  let activities: Activity[] = [];
</script>

<main>
  <h1>Flex Workout Timer</h1>

  <section>
    <h2>My Workouts & Timers</h2>

    {#if activities.length === 0}
      <p>No previous workouts or timers found.</p>
    {:else}
      <ul>
        {#each activities as activity (activity.id)}
          <li>
            {activity.title} ({activity.type})
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</main>
