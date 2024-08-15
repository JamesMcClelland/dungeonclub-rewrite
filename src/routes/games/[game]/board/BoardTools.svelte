<script lang="ts">
	import { Button } from 'components';
	import { Column } from 'components/layout';
	import type { ModalContext } from 'components/modal';
	import { getContext } from 'svelte';
	import SelectBoardDialog from '../board-selection/SelectBoardDialog.svelte';
	import DiceRoller from "components/DiceRoller.svelte";

	const modal = getContext<ModalContext>('modal');

	let showDiceRoller = false;

	async function switchBoard() {
		await modal.display(SelectBoardDialog, {});
	}

</script>

<Column gap="normal">
	<Button raised on:click={switchBoard}>Switch Board</Button>
	<Button raised>Edit Board</Button>
	<Button raised highlight={showDiceRoller} on:click={() => {showDiceRoller = !showDiceRoller}}>Roll Dice</Button>
	{#if showDiceRoller}
		<div class="sidebar-dice-container">
			<DiceRoller />
		</div>
	{/if}
</Column>

<style>
	.sidebar-dice-container {
		position: absolute;
		left: calc(100% + 1rem);
		top: 50%;
	}
</style>