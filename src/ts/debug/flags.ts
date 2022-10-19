import { get, writable } from "svelte/store";
import type { GetWritableType } from "../util/util";
import { ConsoleManager } from "./consoleManager";

let flags = writable({
    "allow_negative": 0,
    "always_show_update_notes": 0
})

type IFlags = GetWritableType<typeof flags>;

export namespace Flags {
    export type FlagsType = keyof IFlags;

    export function getFlagValue(flag: FlagsType): number {
        return (get(flags) as any)[flag];
    }

    export function isFlagEnabled(flag: FlagsType) {
        return getFlagValue(flag) > 0 
    }

    export function getFlags(): IFlags {
        return get(flags)
    }

    export function setFlagValue(flag: FlagsType, value: number) {
        flags.update(fgs => {let fgnew = fgs; fgnew[flag] = value; return fgnew;});
    }

    export function setFlagEnabled(flag: FlagsType, enabled: boolean) {
        setFlagValue(flag, enabled ? 1 : 0);
    }

    export function flagExists(flag: string): boolean {
        return Object.keys(get(flags)).includes(flag);
    }

    export function loadFlags() {
        let flgs = localStorage.getItem("flags");
        if (flgs)
            flags.set(JSON.parse(flgs))
        
        flags.subscribe(fgs => {
            try {
            if (!localStorage) return
            }catch(e){return;}
            localStorage.setItem("flags", JSON.stringify(fgs))
        })
    }

    export namespace Command {
        function configChanged() {
            ConsoleManager.log("Flag configuration changed.")
            ConsoleManager.log("To apply flag configuration type command /reload to reload page.");
        }

        export function execute(args: string[]) {
            switch (args[1]) {
                case "set":
                    if (args.length < 4) {
                        ConsoleManager.consoleError("Missing arguments");
                        return;
                    }
                    if (flagExists(args[2])) {
                        setFlagValue(args[2] as any, parseInt(args[3]))
                        ConsoleManager.log(`Flag "${args[2]}" has been set to ${args[3]}`)
                        configChanged();
                    }
                    break;
                
                case "get":
                    if (args.length < 3) {
                        ConsoleManager.consoleError("Missing arguments");
                        return;
                    }
                    if (flagExists(args[2])) {
                        ConsoleManager.log(`Flag "${args[2]}" has value ${getFlagValue(args[2] as any)}`)
                    }
                    break;
                
                case "list":
                    ConsoleManager.log("<br> Currently availble flags: <br><br>" + Object.entries(get(flags)).map(entry => {
                        return `${entry[0]}: ${entry[1]}`;
                    }).join("<br>") + "<br>")
                    break;
            }
        }
    }
}