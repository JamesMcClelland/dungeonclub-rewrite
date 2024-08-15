<script lang="ts">
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import { socket } from 'client/communication';

    const sidesList = [
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

    async function rollDice(sides: string, repeat: number) {
        console.log(`Rolling ${repeat} ${sides} dice`);

        const response = await $socket.request('diceRoll', {
            visibility,
            sides,
            repeat,
        });

        console.log('Rolls', response);
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
        {#each sidesList as sides }
            <tr>
                <td>
                    d{sides}
                </td>
                {#each Array.from({ length: diceAmounts }) as _, i}
                    <td class="dice-option" on:click={() => rollDice(sides,i + 1)}>
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