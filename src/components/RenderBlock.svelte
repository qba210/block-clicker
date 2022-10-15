<div {style}>
<div class="block-render" style="width: 100%; height: 100%;" >
    <div class="right">
        <img alt="" draggable="false" src={right} />
    </div>
    <div class="left">
        <img alt="" draggable="false" src={left} />
    </div>
    <div class="top">
        <img alt="" draggable="false" src={top} />
    </div>
</div>
</div>

<script lang="ts">
    import { onMount } from "svelte";

    //import domtoimage from "dom-to-image-more";
    import { blockUpgrades, type BlockUpgrade } from "../ts/upgrades";
    import BlockUtil from "../ts/util/blockUtil";

    export let namespace = "_null";
    export let style = "";
    let upgrade = blockUpgrades.find((up) => up.namespace === (namespace ?? "_null")) as BlockUpgrade;

    $: namespace, updateNamespace();

    let left: string = "";
    let right: string = "";
    let top: string = "";

    left = BlockUtil.GetBlockTexture(upgrade, "left")
    right = BlockUtil.GetBlockTexture(upgrade, "right")
    top = BlockUtil.GetBlockTexture(upgrade, "top")

    function updateNamespace() {
        upgrade = blockUpgrades.find((up) => up.namespace === (namespace ?? "_null")) as BlockUpgrade

        left = BlockUtil.GetBlockTexture(upgrade, "left")
        right = BlockUtil.GetBlockTexture(upgrade, "right")
        top = BlockUtil.GetBlockTexture(upgrade, "top")
    }
</script>

<style lang="scss">
    @import "../styles.scss";
</style>