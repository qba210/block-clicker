<div bind:this={toRender} id="block-render">
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
<!-- <img id="rendered" bind:this={renderedImg}> -->

<script lang="ts">
    import { onMount } from "svelte";

    //import domtoimage from "dom-to-image-more";
    import { blockUpgrades, type BlockUpgrade } from "../../ts/upgrades";
    import BlockUtil from "../../ts/util/blockUtil";

    
    let left: string = "";
    let right: string = "";
    let top: string = "";

    let toRender: HTMLDivElement;
    // let renderedImg: HTMLImageElement;

    onMount(async () => {
        //const domtoimage: typeof import("dom-to-image-more") = (await import("dom-to-image-more")).default;
        

        let queryParsed = new URLSearchParams(location.search);
        let upgrade = blockUpgrades.find((up) => up.namespace === (queryParsed.get("namespace") ?? "_null")) as BlockUpgrade;

        left = BlockUtil.GetBlockTexture(upgrade, "left")
        right = BlockUtil.GetBlockTexture(upgrade, "right")
        top = BlockUtil.GetBlockTexture(upgrade, "top")

        // domtoimage.toPng(toRender, {quality: 1}).then((blob) => {
        //     toRender.remove()
        //     renderedImg.src = blob;
        // })
    })
</script>

<style lang="scss">
    @import "../../styles.scss";
</style>