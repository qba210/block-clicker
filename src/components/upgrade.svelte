<div class="upgrade" bind:this={root} on:click={() => (upgrade && !isExpesnive) ? onUpgrade(upgrade) : null}>
    <div class="left-side">
        {#if upgrade}
            {#if upgrade.isBlockUpgrade}
                <RenderBlock style="position: relative; transform: scale(.7) translate(30%, -100%); top: 35%" bind:namespace={namespace} />
            {:else}
                <img class="upgrade-img" src={(upgrade ?? {icon: `${URL_PREFIX}/img/placeholder.png`}).icon} alt="upgrade icon" />
            {/if}
        {/if}
    </div>
    <div class="right-side">
        {#if upgrade}
            {#if upgrade.namespace !== "_null"}
                <h1>{title}</h1>
                <div>Upgrade to {upgrade.title}</div>
            {:else}
                <h1>{title}</h1>
                <div>You have reached max level.</div>
            {/if}
        {:else}
            <h1>{title}</h1>
            <div>You have reached max level.</div>
        {/if}
    </div>
    <div class="bottom-right">
        {#if upgrade}
            {#if upgrade.namespace !== "_null"}
                {upgrade?.price} blocks
            {/if}
        {/if}
    </div>
</div>

<script lang="ts">
    import { URL_PREFIX } from "../ts/config";
    import type ArbitiaryUpgrade from "../ts/upgrades/arbitiaryUpgrade";
    import type { BlockUpgrade } from "src/ts/upgrades";
    import RenderBlock from "./RenderBlock.svelte";

    export let upgrade: ArbitiaryUpgrade | undefined;
    export let onUpgrade: (upgrade: ArbitiaryUpgrade) => void;
    export let title: string = upgrade ? upgrade.title : "";
    export let isExpesnive = false;
    let namespace = "";

    let root: HTMLDivElement;

    $: isExpesnive, root ? ( (isExpesnive || !upgrade) ? root.setAttribute("expensive", "") : root.removeAttribute("expensive") ) : null
    $: upgrade, upgrade ? namespace = upgrade.namespace : null
</script>

<!-- svelte-ignore css-unused-selector -->

<style lang="scss">
    .upgrade {
        display: flex;
        flex-direction: row;
        gap: 10px;
        min-width: 370px;
        border: 3px solid white;
        border-radius: 10px;
        padding: 5px;
        cursor: pointer;
        transition: background-color 0.5s, color 0.5s;
        background-color: white;
        color: black;
        position: relative;

        &:global([expensive]) {
            cursor: not-allowed !important;
            color: white;
            background-color: rgb(93 93 93);
        }

        .upgrade-img {
            width: 100%;
            height: 100%;
        }

        & h1 {
            margin: 0;
        }

        .left-side {
            width: 110px;
            height: 110px;
        }

        .bottom-right {
            position: absolute;
            bottom: 10px;
            right: 10px;
            text-align: right;
        }
    }
</style>