import { loadGame, prepareAutosave } from "./gameManager";

export default class LoadingManager {
    additionalTasks: (() => Promise<void>)[];
    onFinishLoading: () => void

    constructor(onFinishLoading: () => void, additionalTasks?: (() => Promise<void>)[]) {
        this.onFinishLoading = onFinishLoading;
        this.additionalTasks = additionalTasks ?? [];

        //this.startLoading();
    }

    async startLoading() {
        await new Promise((res) => {
            var work = setInterval(() => {
                try {
                    if (window != null) {
                        clearInterval(work);
                        res(null);
                    }
                } catch(_err) {
                    let err = _err as Error;
                    if (!err.message.includes(" is not defined")) {
                        console.error(err);
                    }
                }
            }, 5)
        })

        await new Promise((res) => {
            var work = setInterval(() => {
                try {
                    if (document != null) {
                        clearInterval(work);
                        res(null);
                    }
                } catch(_err) {
                    let err = _err as Error;
                    if (!err.message.includes(" is not defined")) {
                        console.error(err);
                    }
                }
            }, 5)
        })

        loadGame();
        prepareAutosave();

        await this.sleep(2000);

        for(let i = 0; i < this.additionalTasks.length; i++) {
            let task = this.additionalTasks[i];
            await task();
        }

        this.onFinishLoading();
    }

    private async sleep(ms: number) {
        await new Promise(res => setTimeout(() => res(null), ms))
    }
}