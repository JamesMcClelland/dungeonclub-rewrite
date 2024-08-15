<script lang="ts">
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";

    const diceOptions = [
        4,
        6,
        8,
        10,
        12,
        20,
        100
    ];

    const diceAmounts = 5;

    let visibility = 'Private'
    let icon = 'fa-user-lock';

    function rollDice(die: string, amount: number) {
        console.log(`Rolling ${amount} ${die} dice`);

        const rolls = Array.from({ length: amount }, () => Math.floor(Math.random() * parseInt(die)) + 1);

        console.log('Rolls', rolls);
    }

    function updateVisibility() {
        visibility = visibility === 'Private' ? 'Public' : 'Private';
        icon = visibility === 'Private' ? 'fa-user-lock' : 'fa-users';
    }
</script>

<div>
    <table class="dice-table">
        <tr>
           <th colspan={diceAmounts + 1} class="visibility-toggle" on:click={updateVisibility}>
               <span class="visibility-tooltip">
                {visibility}
               </span>
               Visibility
                {#if visibility === 'Private'}
                   <FontAwesomeIcon icon="fa-user-lock" />
                {:else}
                   <FontAwesomeIcon icon="fa-users" />
                {/if}
           </th>
        </tr>
        <tr>
            <th>Die</th>
            <th colspan={diceAmounts}>Amount</th>
        </tr>
        {#each diceOptions as dice }
            <tr>
                <td>
                    d{dice}
                </td>
                {#each Array.from({ length: diceAmounts }) as _, i}
                    <td class="dice-option" on:click={() => rollDice(dice, i + 1)}>
                        {i+1}
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
</div>

<style>
    .dice-option {
        cursor: pointer;
    }

    .dice-table {
        border-collapse: collapse;
        background-color: var(--color-background);
    }

    .dice-table, .dice-table th, .dice-table td {
        border: 2px solid var(--color-separator);
    }

    .dice-table th, .dice-table td {
        padding: 0.2rem 0.5rem;
    }
    
    .visibility-toggle {
        cursor: pointer;
    }

    .visibility-toggle:hover .visibility-tooltip {
        display: block;
    }

    .visibility-tooltip {
        display: none;
        position: absolute;
        background-color: var(--color-background);
        color: var(--color-text);
        padding: 0.5rem;
        border: 1px solid var(--color-separator);
        border-radius: 0.5rem;
        z-index: 1;
        width: 4rem;
        left: calc(50% - 3rem);
        margin-top: -3rem;
    }
</style>