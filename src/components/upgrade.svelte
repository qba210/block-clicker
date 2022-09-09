<div class="upgrade" bind:this={root} on:click={() => upgrade ? onUpgrade(upgrade) : null}>
    <div class="left-side">
        <img alt="upgrade icon" />
    </div>
    <div class="right-side">
        {#if upgrade}
        <h1>{title}</h1>
        <div>Upgrade to {upgrade.title}</div>
        {:else}
        <h1>{title}</h1>
        <div>You have reached max level.</div>
        {/if}
    </div>
</div>

<script lang="ts">
    import type ArbitiaryUpgrade from "src/ts/upgrades/arbitiaryUpgrade";

    export let upgrade: ArbitiaryUpgrade | undefined;
    export let onUpgrade: (upgrade: ArbitiaryUpgrade) => void;
    export let title: string = upgrade ? upgrade.title : "";
    export let isExpesnive = false;

    let root: HTMLDivElement;

    $: isExpesnive, root ? ( isExpesnive || !upgrade ? root.setAttribute("expensive", "") : root.removeAttribute("expensive") ) : null
</script>

<!-- svelte-ignore css-unused-selector -->

<style lang="scss">
    .upgrade {
        display: flex;
        flex-direction: row;
        gap: 10px;
        min-width: 25vw;
        border: 3px solid black;
        border-radius: 10px;
        padding: 5px;
        cursor: pointer;
        transition: background-color 0.5s;
        background-color: white;

        &:global([expensive]) {
            cursor: not-allowed !important;
            background-color: rgb(192, 192, 192);
        }

        & h1 {
            margin: 0;
        }

        .left-side {
            width: 110px;
            height: 110px;
        }
    }
</style>