import { writable } from "svelte/store";

const VERSION_POPUP_SLOT = "versionPopupShownForVersion"
export const VERSION = "5";
export const NEW_FEATS: string[] = ["New upgrade path: Pickaxes!", "Added this popup", "Mobile gameplay improvement", "Bug fixes"]
export let versionPopupShownForVersion = writable("");

export function initializeVersionInfo() {
    versionPopupShownForVersion.set(localStorage.getItem(VERSION_POPUP_SLOT) ?? "");
    versionPopupShownForVersion.subscribe((val) => localStorage.setItem(VERSION_POPUP_SLOT, val))
}