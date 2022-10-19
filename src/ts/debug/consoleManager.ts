import { blocks } from "../managers/gameManager";
import { Flags } from "./flags";

let ogConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    debug: console.debug
}


export namespace ConsoleManager {
    type Listener = () => void;

    let loggingStarted = false;
    let listensForErrors = false;

    export let logEntries: LogEntry[] = [];
    let listeners: Listener[] = [];

    export interface LogEntry {
        type: "log" | "debug" | "warn" | "consoleerror" | "error" | "clear",
        messages: any[],
        time: number,
        errorInfo?: {
            error: Error,
            lineno: number,
            colno: number,
            filename: string
        }
    }

    export function startLogging() {
        if (loggingStarted) return;

        ogConsole.log = console.log;
        ogConsole.error = console.error;
        ogConsole.warn = console.warn;
        ogConsole.debug = console.debug;

        console.log = log;
        console.warn = warn;
        console.error = consoleError;
        console.debug = debug;
        
        if (!listensForErrors) {
            window.addEventListener("error", error);
            listensForErrors = true;
        }

        loggingStarted = true;
    }

    export function stopLogging() {
        if (!loggingStarted) return;

        console.log = ogConsole.log;
        console.error = ogConsole.error;
        console.warn = ogConsole.warn;
        console.debug = ogConsole.debug;


        loggingStarted = false;
    }

    export function addListener(callback: Listener) {
        listeners.push(callback);
    }

    export function executeCommand(command: string) {
        if (!command.startsWith("/")) {
            log(eval(command));
            return
        }

        let parsed = command.substring(1).replace("\n", "").trim().split(" ")

        switch (parsed[0].toLowerCase()) {
            case "blocks":
                let amount = 0;
                if (parsed.length < 2) {
                    amount = +(window.prompt("Input amount") ?? "0")
                } else {
                    amount = +parsed[1]
                }
                blocks.set(amount)
                log(`Setted ${amount} blocks`);
                break;
            
            case "logging":
                if (parsed.length < 2) {
                    log("Logging is " + (loggingStarted ? "enabled" : "disabled"))
                }
                switch (parsed[1]) {
                    case "disable":
                        stopLogging();
                        log("Disabled logging");
                        break;
                    
                    case "enable":
                        startLogging();
                        log("Enabled logging");
                        break;
                }
                break;

            case "flag":
                Flags.Command.execute(parsed);
                break;
            
            case "reload":
                location.reload();
                break;

            default:
                warn("Command not found")
                break;
        }
    }

    export function log(...data: any[]) {
        ogConsole.log(...data)
        logEntries.push({
            type: "log",
            messages: data,
            time: Date.now()
        })
        callListeners();
    }

    export function warn(...data: any[]) {
        ogConsole.log(...data)
        logEntries.push({
            type: "warn",
            messages: data,
            time: Date.now()
        })
        callListeners();
    }

    export function debug(...data: any[]) {
        ogConsole.log(...data)
        logEntries.push({
            type: "debug",
            messages: data,
            time: Date.now()
        })
        callListeners();
    }

    export function consoleError(...data: any[]) {
        ogConsole.log(...data)
        logEntries.push({
            type: "consoleerror",
            messages: data,
            time: Date.now()
        })
        callListeners();
    }

    function error(this: Window, event: ErrorEvent) {
        logEntries.push({
            type: "error",
            messages: [event.message],
            time: Date.now(),
            errorInfo: {
                error: event.error,
                colno: event.colno,
                lineno: event.lineno,
                filename: event.filename
            }
        })
        callListeners();
    }

    function callListeners() {
        listeners.forEach(listener => {
            listener()
        })
    }
}