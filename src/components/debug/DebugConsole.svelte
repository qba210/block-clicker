{#if visible}
    <div id="debug-console" on:mousedown={function(e) {parentClicked.bind(this)(e)}}>
        <div class="inner-parent">
            <div class="console-output">
                {#each localEntries as entry}
                    <div class={`log-entry log-entry-${entry.type}`}>
                        <span class="time">[{msToTimeFormatted(entry.time)}]</span>
                        <span class="time">[{entry.type}]</span>
                        <span>{entry.messages}</span>
                    </div>
                {/each}
            </div>
            <textarea spellcheck="false" class="command-input" bind:this={input} on:keydown={inputCharTyped} ></textarea>
        </div>
    </div>
{/if}

<script lang="ts">
    import { blocks, clearSave } from '../../ts/managers/gameManager';
    import { createEventDispatcher, onMount } from 'svelte';
    import DebugButton from './DebugButton.svelte';
    import { ConsoleManager } from '../../ts/managers/consoleManager';

    let input: HTMLTextAreaElement;
    export let visible = false;

    const dispatch = createEventDispatcher();

    let localEntries: ConsoleManager.LogEntry[] = [];
    let commandHistory: string[] = [];

    onMount(() => {
        ConsoleManager.addListener(onLogged);
    })

    function onLogged() {
        localEntries = ConsoleManager.logEntries;
    }
    

    function inputCharTyped(event: KeyboardEvent) {
        let cursorPos = input.selectionStart;
        console.log(cursorPos);

        if (event.key === "Enter" && !event.ctrlKey) {
            event.preventDefault();
            ConsoleManager.executeCommand(input.value)
            commandHistory.push(input.value);
            input.value = "";
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
    #debug-console {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        backdrop-filter: blur(10px);
        z-index: 734573458749;

        .inner-parent {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

            width: 70%;
            height: 50%;
            background-color: black;
            border: 3px solid white;
        }

        .console-output {
            font-family: "Roboto Mono";
            background-color: black;
            display: flex;
            overflow-y: auto;
            height: 80%;
            flex-direction: column;
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