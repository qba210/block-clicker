<PopupWrapper zIndex={999999991} on:dimissed={function(e) {dispatch("dimissed")}}>
    <h1 class="title">{title}</h1>
    <div class="subtitle">Press outside of the box to dimiss</div>
    <div>
        <slot/>
    </div>
</PopupWrapper>

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import PopupWrapper from "./PopupWrapper.svelte";


    export let title: string;

    const dispatch = createEventDispatcher();
</script>

<style lang="scss">
    h1.title {
        text-align: center;
        margin-bottom: 7px;
    }
    .subtitle {
        text-align: center;
        margin-bottom: 20px;
        font-size: 13px;
    }
</style>