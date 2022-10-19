import type { Writable } from "svelte/store";

export type GetWritableType<S> = S extends Writable<infer T> ? T : never