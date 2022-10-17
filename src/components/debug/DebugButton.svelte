<div class="btn" on:click={(event) => dispatch("click", {event})}>
    <div class="content">
        <slot/>
    </div>
</div>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
</script>

<style lang="scss">
    .btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid white;
        cursor: pointer;
        padding: 10px;
        background-color: rgb(7, 136, 227);
    }
    .content {
        width: max-content;
        // transform: translate(-50%, -50%);
    }
</style>