{#if !finishedLoading}
    <Loading/>
{/if}
<div class="blocks-header">
    <h1>{Math.trunc(blocks)} blocks</h1>
    <h3>x{multiplier}</h3>
    <h3>{bps} bps</h3>    
</div>
<div on:click={() => blocks += multiplier} id="block">
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
    import { writable } from "svelte/store";
    import Loading from "../components/loading.svelte";
    import type ArbitiaryUpgrade from "src/ts/upgrades/arbitiaryUpgrade";

    let blocks: number = 0;
    let multiplier: number = 1;
    let bps: number = 0;

    let blockLeft: HTMLImageElement;
    let blockRight: HTMLImageElement;
    let blockTop: HTMLImageElement;

    let finishedLoadingStore = writable(false);
    let finishedLoading = false;

    let upgradeManager: UpgradeManager;
    let loadingManager = new LoadingManager(onFinishedLoading);

    let nextBlockUpgrade: ArbitiaryUpgrade | undefined;
    let blockUpgradeExpensive: boolean = true;

    let bpsWorker = setInterval(() => {
        let bpms = bps * 0.001;
        blocks += bpms;
    }, 1);
    
    $: nextBlockUpgrade, console.log("Next block up", nextBlockUpgrade);
    
    finishedLoadingStore.subscribe(val => finishedLoading = val);
    loadingManager.startLoading();

    $: blocks, (() => {try {
        document.title = `${blocks} blocks - Block Clicker`

        if (nextBlockUpgrade) {
            blockUpgradeExpensive = nextBlockUpgrade.price > blocks;
        }

    } catch(err) {
        console.error(err);
    }

    })()


    const getters: BlockGetters = {
        getBlocks: () => blocks,
        getMultiplier: () => multiplier,
        getBps: () => bps,
    }
    const setters: BlockSetters = {
        setBlocks: (val) => blocks = val,
        setMultiplier: (val) => multiplier = val,
        setBps: (val) => bps = val,
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

        upgradeManager = new UpgradeManager(blockLeft, blockTop, blockRight, getters, setters);
        upgradeManager.ForceApplyBlockUpgrade(blockUpgrades[0])

        nextBlockUpgrade = UpgradeManager.toArbitiaryBlock(upgradeManager.GetNextBlockUpgradeSure());

        document.getElementById("block")?.addEventListener("mouseenter", () => document.body.setAttribute("noselect", ""))
        document.getElementById("block")?.addEventListener("mouseleave", () => document.body.removeAttribute("noselect"))

        window.addEventListener("beforeunload", (event) => {
            finishedLoadingStore.set(false);
        })

        window.addEventListener("keyup", (event) => {
            
            console.log("event", event);
            if (event.keyCode === 79 && event.ctrlKey && event.shiftKey) {
                let newval =  parseFloat(prompt("set value") ?? "");
                if (!isNaN(newval)) {
                    blocks = newval;
                }
            }
        })
    }

</script>

<style lang="scss" global>
    @import "../styles.scss";

    .upgrades {
        float: right;
    }
</style>