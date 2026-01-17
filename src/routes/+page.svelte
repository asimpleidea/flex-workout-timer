<script lang="ts">
  import {
    type Timer,
    type WorkoutSet,
    type Interval,
    IntervalType,
  } from "$lib/models";
  import { MAX_NAME_LENGTH } from "$lib/constants";
  import { timerStore } from "$lib/stores/timer-store.svelte";

  // Form State
  let isCreating = $state(false);
  let newTimerTitle = $state("");
  let newTimerSets = $state<WorkoutSet[]>([]);

  // Set Creation Form State
  let isCreatingSet = $state(false);
  let newSetName = $state("");
  let newSetIterations = $state(1);
  let newSetColor = $state("#3b82f6"); // Default blue

  // Interval Creation Form State
  let addingIntervalToSetId = $state<string | null>(null);
  let newIntervalName = $state("");
  let newIntervalType = $state<IntervalType>(IntervalType.Work);
  let newIntervalDuration = $state(30);

  // Reactive Derived Values
  let totalDurationSeconds = $derived(
    newTimerSets.reduce((total, set) => {
      const setDuration = set.intervals.reduce(
        (subTotal, interval) => subTotal + interval.duration,
        0
      );
      return total + setDuration * set.iterations;
    }, 0)
  );

  let totalDurationFormatted = $derived(formatDuration(totalDurationSeconds));

  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      if (secs > 0) return `${mins}m ${secs}s`;
      return `${mins}m`;
    }
    return `${secs}s`;
  }

  function startCreation() {
    isCreating = true;
    newTimerTitle = "";
    newTimerSets = [];
    isCreatingSet = false;
    addingIntervalToSetId = null;
  }

  function cancelCreation() {
    isCreating = false;
  }

  function startSetCreation() {
    isCreatingSet = true;
    newSetName = "";
    newSetIterations = 1;
    newSetColor = "#3b82f6";
  }

  function cancelSetCreation() {
    isCreatingSet = false;
  }

  function saveSet() {
    if (!newSetName.trim() || newSetName.length > MAX_NAME_LENGTH) return;

    const newSet: WorkoutSet = {
      id: Math.random().toString(36).substring(2, 9),
      name: newSetName,
      iterations: newSetIterations,
      color: newSetColor,
      intervals: [],
    };

    newTimerSets.push(newSet);
    isCreatingSet = false;
  }

  function startIntervalCreation(setId: string) {
    addingIntervalToSetId = setId;
    newIntervalName = "";
    newIntervalType = IntervalType.Work;
    newIntervalDuration = 30;
  }

  function cancelIntervalCreation() {
    addingIntervalToSetId = null;
  }

  function saveInterval() {
    if (
      !addingIntervalToSetId ||
      !newIntervalName.trim() ||
      newIntervalName.length > MAX_NAME_LENGTH
    )
      return;

    const newInterval: Interval = {
      id: Math.random().toString(36).substring(2, 9),
      name: newIntervalName,
      type: newIntervalType,
      duration: newIntervalDuration,
    };

    // Find the set and add interval using mutation (since newTimerSets is a proxy)
    const set = newTimerSets.find((s) => s.id === addingIntervalToSetId);
    if (set) {
      set.intervals.push(newInterval);
    }

    addingIntervalToSetId = null;
  }

  function saveTimer() {
    if (!newTimerTitle.trim() || newTimerTitle.length > MAX_NAME_LENGTH) return;

    const newTimer: Timer = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTimerTitle,
      sets: $state.snapshot(newTimerSets),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    timerStore.save(newTimer);
    cancelCreation();
  }
</script>

<main>
  <h1>Flex Workout Timer</h1>

  <!-- Creation visual toggle -->
  {#if !isCreating}
    <button on:click={startCreation}>Create New Timer</button>
  {/if}

  {#if isCreating}
    <section>
      <h2>New Timer</h2>

      <div>
        <label for="timer-title">Title</label>
        <input
          id="timer-title"
          type="text"
          bind:value={newTimerTitle}
          maxlength={MAX_NAME_LENGTH}
          placeholder="Enter timer title"
        />
        <p style="margin-top: 5px; color: #666; font-size: 0.9rem;">
          Total Duration: <strong>{totalDurationFormatted}</strong>
        </p>
      </div>

      <div>
        <h3>Sets</h3>

        {#if newTimerSets.length === 0}
          <p>No sets added yet.</p>
        {:else}
          <ul style="list-style: none; padding: 0;">
            {#each newTimerSets as set (set.id)}
              <li
                style="
                margin-bottom: 0.5rem; 
                padding: 0.5rem; 
                border-left: 5px solid {set.color};
                background-color: #f3f4f6;
              "
              >
                <div
                  style="display: flex; justify-content: space-between; align-items: center;"
                >
                  <div>
                    <strong>{set.name}</strong>
                    <span style="color: #666;">(x{set.iterations})</span>
                  </div>
                </div>

                <!-- Intervals List -->
                {#if set.intervals.length > 0}
                  <ul style="margin-top: 0.5rem; padding-left: 1rem;">
                    {#each set.intervals as interval (interval.id)}
                      <li>
                        {interval.name} - {interval.type} ({interval.duration}s)
                      </li>
                    {/each}
                  </ul>
                {/if}

                <!-- Add Interval Button / Form -->
                {#if addingIntervalToSetId !== set.id}
                  <button
                    style="margin-top: 5px; font-size: 0.8rem;"
                    on:click={() => startIntervalCreation(set.id)}
                  >
                    + Add Interval
                  </button>
                {:else}
                  <div
                    style="background: white; padding: 10px; margin-top: 10px; border: 1px solid #ddd;"
                  >
                    <h5>Add Interval to {set.name}</h5>

                    <div style="margin-bottom: 5px;">
                      <label for="int-name">Name: </label>
                      <!-- svelte-ignore a11y-autofocus -->
                      <input
                        id="int-name"
                        type="text"
                        bind:value={newIntervalName}
                        maxlength={MAX_NAME_LENGTH}
                        autofocus
                      />
                    </div>

                    <div style="margin-bottom: 5px;">
                      <label for="int-type">Type: </label>
                      <select id="int-type" bind:value={newIntervalType}>
                        <option value={IntervalType.Work}>Work</option>
                        <option value={IntervalType.Rest}>Rest</option>
                      </select>
                    </div>

                    <div style="margin-bottom: 5px;">
                      <label for="int-dur">Duration (s): </label>
                      <input
                        id="int-dur"
                        type="number"
                        min="1"
                        bind:value={newIntervalDuration}
                      />
                    </div>

                    <div style="margin-top: 10px;">
                      <button on:click={cancelIntervalCreation}>Cancel</button>
                      <button on:click={saveInterval}>Save Interval</button>
                    </div>
                  </div>
                {/if}
              </li>
            {/each}
          </ul>
        {/if}

        {#if !isCreatingSet}
          <button on:click={startSetCreation}>+ Add New Set</button>
        {:else}
          <div
            style="border: 1px solid #ddd; padding: 1rem; margin-top: 1rem; border-radius: 4px;"
          >
            <h4>Create Set</h4>

            <div style="margin-bottom: 0.5rem;">
              <label for="set-name">Set Name</label>
              <input
                id="set-name"
                type="text"
                bind:value={newSetName}
                maxlength={MAX_NAME_LENGTH}
                placeholder="e.g. Warmup"
              />
            </div>

            <div style="margin-bottom: 0.5rem;">
              <label for="set-iterations">Repeats</label>
              <input
                id="set-iterations"
                type="number"
                min="1"
                bind:value={newSetIterations}
              />
            </div>

            <div style="margin-bottom: 1rem;">
              <label for="set-color">Color</label>
              <input id="set-color" type="color" bind:value={newSetColor} />
            </div>

            <div>
              <button on:click={cancelSetCreation}>Cancel</button>
              <button on:click={saveSet}>Save Set</button>
            </div>
          </div>
        {/if}
      </div>

      <div
        style="margin-top: 2rem; border-top: 1px solid #eee; padding-top: 1rem;"
      >
        <button on:click={cancelCreation}>Cancel</button>
        <button on:click={saveTimer}>Save</button>
      </div>
    </section>
  {/if}

  <section>
    <h2>My Timers</h2>

    {#if timerStore.timers.length === 0}
      <p>No timers found.</p>
    {:else}
      <ul>
        {#each timerStore.timers as timer (timer.id)}
          <li>
            {timer.title} ({timer.sets.length} sets)
          </li>
        {/each}
      </ul>

      <div style="margin-top: 2rem; background: #eee; padding: 1rem;">
        <h3>Debug: JSON Data</h3>
        <button
          on:click={() =>
            console.log(JSON.stringify(timerStore.timers, null, 2))}
          >Log to Console</button
        >
        <pre
          style="background: #333; color: #fff; padding: 10px; overflow: auto; max-height: 300px;">
          {JSON.stringify(timerStore.timers, null, 2)}
        </pre>
      </div>
    {/if}
  </section>
</main>
