{#if visible}
    <PopupWrapper zIndex={999999995} id="debug-console" on:dimissed={function(e) {dispatch("dimissed")}}>
        <div class="options">
            <Checkbox bind:checked={rowCulling} id="row-culling-check" label="Row Culling" />
        </div>
        <div bind:this={output} class="console-output">
            {#each localEntries as entry}
                <div class={`log-entry log-entry-${entry.type}`}>
                    <span class="time">[{msToTimeFormatted(entry.time)}]</span>
                    <span class="time">[{entry.type}]</span>
                    <span>{@html entry.messages}</span>
                </div>
            {/each}
        </div>
        <textarea spellcheck="false" class="command-input" bind:this={input} on:keydown={inputCharTyped} ></textarea>
    </PopupWrapper>
{/if}

<script lang="ts">
    import { blocks, clearSave } from '../../ts/managers/gameManager';
    import { createEventDispatcher, onMount } from 'svelte';
    import DebugButton from './DebugButton.svelte';
    import { ConsoleManager } from '../../ts/debug/consoleManager';
    import PopupWrapper from "../PopupWrapper.svelte";
    import Checkbox from "../Checkbox.svelte";

    let input: HTMLTextAreaElement;
    let output: HTMLDivElement;
    export let visible = false;

    const dispatch = createEventDispatcher();

    let localEntries: ConsoleManager.LogEntry[] = [];
    let commandHistory: string[] = [];
    let mounted = false;

    let rowCulling = true;

    $: visible, scrollToBottom();

    $: rowCulling, output ? (rowCulling ? output.setAttribute("row-culling", "") : output.removeAttribute("row-culling")) : null

    onMount(() => {
        ConsoleManager.addListener(onLogged);
        mounted = true;
    });

    function scrollToBottom() {
        if (mounted && visible && output) {
            output.scroll({behavior: 'smooth', top: output.scrollHeight})
        }
    }

    function onLogged() {
        localEntries = ConsoleManager.logEntries;
    }
    

    function inputCharTyped(event: KeyboardEvent) {
        let cursorPos = input.selectionStart;
        // console.log(cursorPos);

        if (event.key === "Enter" && !event.ctrlKey) {
            event.preventDefault();
            let val = input.value;
            commandHistory.push(val);
            input.value = "";
            ConsoleManager.executeCommand(val)
        }
        if (event.code === "Enter" && event.ctrlKey) {
            event.preventDefault();
            input.value = "\n";
        }
    }

    function msToTimeFormatted(ms: number) {
        let date = new Date(ms);
        return `${date.getHours()}:${normalizeDatePart(date.getMinutes())}:${normalizeDatePart(date.getSeconds())}`
    }

    function normalizeDatePart(num: number): string {
        if (num < 10) {
            return `0${num.toString()}`;
        }
        return num.toString();
    }

    function parentClicked(this: any, event: MouseEvent) {
        if (event.target !== this) return;

        console.log(typeof this);

        dispatch("dimissed");
    }
</script>

<style lang="scss">
    :global(#debug-console) {

        :global(.inner-parent) {
            width: 70%;
            height: 60%;
        }

        .console-output {
            font-family: "Roboto Mono";
            background-color: black;
            display: flex;
            overflow-y: auto;
            height: 77%;
            flex-direction: column;
            margin-left: 5px;

            &:not([row-culling]) {
                word-wrap: none;
                word-break: keep-all;   
                overflow-x: auto;

                & > div {
                    max-width: 10000px;
                    width: max-content;
                    margin-right: 10px;
                }
            }
        }

        .command-input {
            position: absolute;
            left: 5px;
            bottom: 5px;
            right: 5px;
            height: 15%;
            font-size: 20px;
            resize: none;
        }

        .options {
            display: flex;
            flex-direction: row;
        }

        .log-entry-warn {
            color: yellow;
        }

        .log-entry-error, .log-entry-consoleerror {
            color: red;
        }

        .log-entry-debug {
            color: rgb(181, 181, 181);
        }
        
    }
</style>