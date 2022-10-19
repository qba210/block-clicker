<span>
    <input type="checkbox" {id} bind:checked={checked} />
    <label for={id}>{label}</label>
</span>

<script lang="ts">
    export let checked = false;
    export let label: string;
    export let id: string;

</script>