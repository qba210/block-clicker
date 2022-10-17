{#if !finishedLoading}
    <Loading/>
{/if}
{#if allowDebug}
    {#if debugMenuOpen}
        <DebugMenu on:dimissed={() => debugMenuOpen = false} />
    {/if}
    <DebugConsole visible={consoleOpen} on:dimissed={() => consoleOpen = false} />
{/if}
<div class="blocks-header">
    <h1>{Math.trunc(localBlocks)} blocks</h1>
    <h3>x{localMultiplier}</h3>
    <h3>{localBps} bps</h3>
    {#if allowDebug}
        <sub>DEBUG ENABLED</sub>
    {/if}
</div>
<div class="block-over">
<div on:click={() => blocks.update(val => val + get(multiplier))} id="block">
    <div class="right">
        <img alt="" draggable="false" bind:this={blockRight} />
    </div>
    <div class="left">
        <img alt="" draggable="false" bind:this={blockLeft} />
    </div>
    <div class="top">
        <img alt="" draggable="false" bind:this={blockTop} />
    </div>
</div>
</div>
{#if upgradeManager}
<div class="upgrades">
    <Upgrade onUpgrade={onBlockUpgraded} bind:isExpesnive={blockUpgradeExpensive} title="Block upgrade" bind:upgrade={nextBlockUpgrade}/>
</div>
{/if}

<script async="true" lang="ts">
    import { UpgradeManager, type BlockGetters, type BlockSetters } from "../ts/managers/upgradeManager";
    import { blockUpgrades } from "../ts/upgrades";
    import { onMount } from "svelte";
    import Upgrade from "../components/upgrade.svelte";
    import LoadingManager from "../ts/managers/loadingManager";
    import { get, writable } from "svelte/store";
    import Loading from "../components/loading.svelte";
    import DebugMenu from "../components/debug/DebugMenu.svelte"
    import type ArbitiaryUpgrade from "../ts/upgrades/arbitiaryUpgrade";
    import hotkeys from 'hotkeys-js';
    import { bps, blocks, multiplier } from "../ts/managers/gameManager";
    import DebugConsole from "../components/debug/DebugConsole.svelte";

    let blockLeft: HTMLImageElement;
    let blockRight: HTMLImageElement;
    let blockTop: HTMLImageElement;

    let finishedLoadingStore = writable(false);
    let finishedLoading = false;

    let upgradeManager: UpgradeManager;
    let loadingManager = new LoadingManager(onFinishedLoading);

    let nextBlockUpgrade: ArbitiaryUpgrade | undefined;
    let blockUpgradeExpensive: boolean = true;

    let allowDebug = false;
    let debugMenuOpen = false;
    let consoleOpen = false;

    let localBlocks = get(blocks);
    let localMultiplier = get(multiplier);
    let localBps = get(bps);

    blocks.subscribe(val => localBlocks = val)
    multiplier.subscribe(val => localMultiplier = val)
    bps.subscribe(val => localBps = val)

    let bpsWorker = setInterval(() => {
        let bpms = get(bps) * 0.005;
        blocks.update((val) => val + bpms);
    }, 1);
    
    $: nextBlockUpgrade, console.log("Next block up", nextBlockUpgrade);
    
    finishedLoadingStore.subscribe(val => finishedLoading = val);
    loadingManager.startLoading();

    blocks.subscribe((value) => {
        try {
            document.title = `${Math.trunc(localBlocks)} blocks - Block Clicker`

            if (nextBlockUpgrade) {
                blockUpgradeExpensive = (nextBlockUpgrade.price > value) || nextBlockUpgrade.namespace === "_null";
            }

        } catch(err) {
            console.error(err);
        }
    })


    const getters: BlockGetters = {
        getBlocks: () => get(blocks),
        getMultiplier: () => get(multiplier),
        getBps: () => get(bps),
    }
    const setters: BlockSetters = {
        setBlocks: (val) => blocks.set(val),
        setMultiplier: (val) => multiplier.set(val),
        setBps: (val) => bps.set(val),
    }

    function onBlockUpgraded(arbUpgrade: ArbitiaryUpgrade) {
        let upgrade = UpgradeManager.fromArbitiaryBlock(arbUpgrade);
        if (upgradeManager.ApplyBlockUpgrade(upgrade)) {
            nextBlockUpgrade = upgradeManager.GetNextBlockUpgrade() ? UpgradeManager.toArbitiaryBlock(upgradeManager.GetNextBlockUpgradeSure()) : undefined
        }
        nextBlockUpgrade = nextBlockUpgrade;  
    }

    async function onFinishedLoading() {
        finishedLoadingStore.set(true);

        allowDebug = location.hash === "#enable-debug"

        window.addEventListener("hashchange", (e) => {
            if (location.hash === "#enable-debug") {
                allowDebug = confirm("Enable debug mode?")
            } else {
                allowDebug = false;
            }
        })

        hotkeys("ctrl+alt+f1, ctrl+alt+f2", function(event, handler) {
            event.preventDefault();
            console.log(handler.key)
            switch (handler.key) {
                case "ctrl+alt+f1":
                    debugMenuOpen = !debugMenuOpen;
                    break;

                case "ctrl+alt+f2":
                    consoleOpen = !consoleOpen;
                    break;
            }
            
        })

        upgradeManager = new UpgradeManager(blockLeft, blockTop, blockRight, getters, setters);
        //upgradeManager.ForceApplyBlockUpgrade(blockUpgrades[0])

        nextBlockUpgrade = UpgradeManager.toArbitiaryBlock(upgradeManager.GetNextBlockUpgradeSure());

        document.getElementById("block")?.addEventListener("mouseenter", () => document.body.setAttribute("noselect", ""))
        document.getElementById("block")?.addEventListener("mouseleave", () => document.body.removeAttribute("noselect"))

        window.addEventListener("beforeunload", (event) => {
            finishedLoadingStore.set(false);
        })
    }

</script>

<style lang="scss" global>
    @import "../styles.scss";
</style>