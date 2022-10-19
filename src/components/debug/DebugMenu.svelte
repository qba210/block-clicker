<PopupWrapper zIndex={999999992} id="debug-console" on:dimissed={function(e) {dispatch("dimissed")}}>
    <h1 style="text-align: center;">Block Clicker debugmenu</h1>
    {#if window.mobileAndTabletCheck()}
        <DebugButton on:click={openConsole}>Open console</DebugButton>
    {/if}
    <div class="debug-options">    
        <DebugButton on:click={clearSave}>Clear save</DebugButton>
        <DebugButton on:click={() => blocks.update((blck) => blck + 100)}>Add 100 blocks</DebugButton>
    </div>
</PopupWrapper>

<script lang="ts">
    import { blocks, clearSave } from '../../ts/managers/gameManager';
    import { createEventDispatcher } from 'svelte';
    import DebugButton from './DebugButton.svelte';
    import PopupWrapper from "../PopupWrapper.svelte";
    import "../../ts/extensions/WindowExtension"


    const dispatch = createEventDispatcher();

    function parentClicked(this: any, event: MouseEvent) {
        if (event.target !== this) return;

        console.log(typeof this);

        dispatch("dimissed");
    }

    function openConsole() {
        document.dispatchEvent(new KeyboardEvent("keydown", {ctrlKey: true, altKey: true, key: "F2", code: "F2", which: 113, keyCode: 113, location: 0}))
        document.dispatchEvent(new KeyboardEvent("keyup", {ctrlKey: true, altKey: true, key: "F2", code: "F2", which: 113, keyCode: 113, location: 0}))
    }
</script>

<style lang="scss">
    .debug-options {
        display: grid;
        margin-top: 10px;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    }
</style>