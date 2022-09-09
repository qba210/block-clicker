<div class="bg">
    <div class="bg-img" src={getBackgroundUrl()} style="background-image: url({getBackgroundUrl()});"> </div>
    <h1 class="header">Block Clicker</h1>
    <div class="bg" style="--background-image: url({getBackgroundUrl()});">
        <div class="cube-wrapper">
            <div class="block-cube">
                <div class="backright">
                    <img alt="" draggable="false" src={blockBackRight} />
                </div>
                <div class="backleft">
                    <img alt="" draggable="false" src={blockBackLeft} />
                </div>
                <div class="right">
                    <img alt="" draggable="false" src={blockRight} />
                </div>
                <div class="left">
                    <img alt="" draggable="false" src={blockLeft} />
                </div>
                <div class="top">
                    <img alt="" draggable="false" src={blockTop} />
                </div>
            </div>
        </div>
        <div class="splash">
            <h1>{Localization.getLocalizedString("splash-header", "header")}</h1>
            {Localization.getRandomSplash()}
        </div>
    </div>
</div>

<script lang="ts">
    import "../ts/extensions/ArrayExtension"
    import { blockUpgrades } from "../ts/upgrades";
    import * as Localization from "../ts/localization";
    import { onMount } from "svelte"
    import { URL_PREFIX } from "../ts/config";

    let blockLeft: string;
    let blockRight: string;
    let blockBackRight: string;
    let blockBackLeft: string;
    let blockTop: string;

    let targetBlockUpgrade = blockUpgrades.filter((upgrade) => upgrade.textureMode !== "sided").pick();

    function getBackgroundUrl() {
        if (targetBlockUpgrade.textureMode === "all") {
            return `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/all.${targetBlockUpgrade.imageExtension}`;
        }
        return `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/bottom.${targetBlockUpgrade.imageExtension}`;
    }

    
    switch (targetBlockUpgrade.textureMode) {
        case "all":
            blockLeft = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/all.jpg`;
            blockTop = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/all.jpg`;
            blockRight = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/all.jpg`;
            blockBackRight = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/all.jpg`;
            blockBackLeft = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/all.jpg`;
            break;

        case "bottomtop":
            blockLeft = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/bottom.jpg`;
            blockTop = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/top.jpg`;
            blockRight = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/bottom.jpg`;
            blockBackRight = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/bottom.jpg`;
            blockBackLeft = `${URL_PREFIX}/img/blocks/${targetBlockUpgrade.namespace}/bottom.jpg`;
            break;
    }
</script>

<style lang="scss">
    @use "../sass/mixins.scss";

    $block-cube-transform: translate(-50%, -50%) translateZ(50px) rotateX(325deg);

    .cube-wrapper {
        position: absolute;
        left: calc(50% - 50px);
        top: calc(50% - 50px);
        transform: translate(-50%, -50%);
    }

    .header {
        position: absolute;
        left: 50%;
        top: 15%;
        transform: translate(-50%, -50%);
        z-index: 7;
        font-size: 80px;
        @include mixins.glow(8px, 0.4px, #fff);
    }

    .splash {
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 20%;
        border-radius: 10px;
        padding: 10px;
        background-color: rgba($color: #fff, $alpha: .3);
        @include mixins.glow(4px, 0.3px, rgb(255, 238, 0));
        font-size: 25px;
        font-weight: bold;
        text-align: center;
        padding-top: 35px;

        & > h1 {
            position: absolute;
            top: 0;
            left: 50%;
            width: 100%;
            @include mixins.glow(4px, 0.3px, #fff);
            transform: translate(-50%, -100%);
        }
    }

    .bg {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .bg-img {
        background-color: white;
        filter: blur(20px);
        transform: scale(1.1);
        @extend .bg;
    }

    .block-cube {
        // position: fixed !important;
        // left: 50%;
        // top: 50%;
        animation-name: spin;
        animation-duration: 3s;
        animation-iteration-count: infinite;

        transform-origin: 50px 50px -50px;
        @include mixins.cube($block-cube-transform rotateY(45deg), 100px);
    }

    @keyframes spin {
        from {
            transform: $block-cube-transform rotateY(45deg);
        }
        to {
            transform: $block-cube-transform rotateY(405deg);
        }
    }
</style>