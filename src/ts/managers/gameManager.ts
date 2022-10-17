import { get, writable } from "svelte/store";
import { UpgradeManager } from "./upgradeManager";

export let blocks = writable(0);
export let multiplier = writable(1);
export let bps = writable(0);
export let blockUpgradeIndex = writable(0);

const saveEntries = [blocks, multiplier, bps, blockUpgradeIndex]
const SAVE_SLOT = "save";

export interface GameSave {
    blocks: number;
    multiplier: number;
    bps: number;
    blockUpgradeIndex: number;
}

let hasLoadedGame = false;

export function prepareAutosave() {
    saveEntries.forEach(entry => {
        entry.subscribe(saveGame)
    })
}

export function saveGame() {
    if (!hasLoadedGame) return;
    try {
        if (!localStorage) return;
    } catch(e) {
        return;
    }
    localStorage.setItem(SAVE_SLOT, JSON.stringify({
        blocks: get(blocks),   
        multiplier: get(multiplier),
        bps: get(bps),   
        blockUpgradeIndex: get(blockUpgradeIndex),   
    }))
}

export function loadGame() {
    let save: GameSave = JSON.parse(localStorage.getItem(SAVE_SLOT) ?? "{}")

    if (save) {
        blocks.set(save.blocks ?? 0);
        multiplier.set(save.multiplier ?? 1);
        bps.set(save.bps ?? 0);
        blockUpgradeIndex.set(save.blockUpgradeIndex ?? 0);
        UpgradeManager.setBaseBlockUpgradeIndex(save.blockUpgradeIndex ?? 0);
        hasLoadedGame = true;
    }
}

export function clearSave() {
    hasLoadedGame = false;

    localStorage.removeItem(SAVE_SLOT);
    location.reload();
}