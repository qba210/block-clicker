<div id="debug-menu" on:click={function(e) {parentClicked.bind(this)(e)}}>
    <div class="inner-parent">
        <h1 style="text-align: center;">Block Clicker debugmenu</h1>
    </div>
</div>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function parentClicked(this: any, event: MouseEvent) {
        if (event.target !== this) return;

        console.log(typeof this);

        dispatch("dimissed");
    }
</script>

<style lang="scss">
    #debug-menu {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        backdrop-filter: blur(10px);
        z-index: 734573458739;

        .inner-parent {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            width: 50%;
            height: 50%;
            background-color: black;
            border: 3px solid white;
        }
    }
</style>