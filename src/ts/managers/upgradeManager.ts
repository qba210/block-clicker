import { blockUpgrades, findBlockUpgradeByNamespace, type BlockUpgrade } from "../upgrades";
import type ArbitiaryUpgrade from "../upgrades/arbitiaryUpgrade";
import * as Localization from "../localization"
import IllegalStateError from "../errors/IllegalStateError";
import { URL_PREFIX } from "../config";
import { blockUpgradeIndex } from "./gameManager";
import { get } from "svelte/store";

export interface BlockGetters {
    getBlocks: () => number;
    getMultiplier: () => number;
    getBps: () => number;
}

export interface BlockSetters {
    setBlocks: (blocks: number) => void;
    setMultiplier: (multiplier: number) => void;
    setBps: (bps: number) => void;
}

let baseBlockUpgradeIndex = 0;

export class UpgradeManager {
    left: HTMLImageElement;
    top: HTMLImageElement;
    right: HTMLImageElement;

    getters: BlockGetters;
    setters: BlockSetters;

    
    
    constructor(leftSide: HTMLImageElement, topSide: HTMLImageElement, rightSide: HTMLImageElement, getters: BlockGetters, setters: BlockSetters) {
        this.left = leftSide;
        this.top = topSide;
        this.right = rightSide;
        this.getters = getters;
        this.setters = setters;

        blockUpgradeIndex.set(baseBlockUpgradeIndex);
        this.ForceApplyBlockUpgrade(blockUpgrades[baseBlockUpgradeIndex], true)
    }

    static setBaseBlockUpgradeIndex(index: number) {
        console.log(index);
        baseBlockUpgradeIndex = index;
    }

    static toArbitiaryBlock(upgrade: BlockUpgrade): ArbitiaryUpgrade {
        let localized = Localization.getLocalizedUpgrade(upgrade.namespace) ?? {title: undefined, description: undefined};
        let icon = `${URL_PREFIX}/img/placeholder.png`;
        switch (upgrade.textureMode) {
            case "all": 
                icon = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/all.${upgrade.imageExtension}`;
                break;
            case "bottomtop": 
                icon = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/bottom.${upgrade.imageExtension}`;
                break;
            case "sided": 
                icon = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/left.${upgrade.imageExtension}`;
                break;
        }
        

        return {
            description: localized.description,
            title: localized.title,
            namespace: upgrade.namespace,
            icon,
            price: upgrade.price,
            upgradeValues: upgrade.upgradeValues
        }
    }

    static fromArbitiaryBlock(upgrade: ArbitiaryUpgrade): BlockUpgrade {
        return blockUpgrades.find((upgr) => upgr.namespace === upgrade.namespace)!;
    }

    GetBlockUpgradeIndex() {
        return get(blockUpgradeIndex);
    }

    GetBlockUpgrade() {
        return blockUpgrades[this.GetBlockUpgradeIndex()];
    }

    GetNextBlockUpgrade(): BlockUpgrade | undefined {
        return blockUpgrades[this.GetBlockUpgradeIndex()+1];
    }

    GetNextBlockUpgradeSure(): BlockUpgrade {
        return this.GetNextBlockUpgrade()!;
    }

    ApplyBlockUpgrade(upgrade: BlockUpgrade) {
        if (upgrade && this.getters.getBlocks() >= upgrade.price && !upgrade.isDisabled) {
            this.ForceApplyBlockUpgrade(upgrade);
            return true;
        }
        return false;
    }

    ForceApplyBlockUpgrade(upgrade: BlockUpgrade, skipValues: boolean = false) {
        
        if (!skipValues) {
            this.setters.setBlocks(this.getters.getBlocks() - upgrade.price);
            this.setters.setBps(this.getters.getBps() + upgrade.upgradeValues.bps);
            this.setters.setMultiplier(this.getters.getMultiplier() + upgrade.upgradeValues.multiplier);
        }

        console.log(upgrade)

        switch (upgrade.textureMode) {
            case "all":
                this.left.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/all.jpg`;
                this.top.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/all.jpg`;
                this.right.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/all.jpg`;
                this.setFavicon(`${URL_PREFIX}/img/blocks/${upgrade.namespace}/all.jpg`);
                break;

            case "bottomtop":
                this.left.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/bottom.jpg`;
                this.top.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/top.jpg`;
                this.right.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/bottom.jpg`;
                this.setFavicon(`${URL_PREFIX}/img/blocks/${upgrade.namespace}/bottom.jpg`);
                break;
            
            case "sided":
                this.left.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/left.jpg`;
                this.top.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/top.jpg`;
                this.right.src = `${URL_PREFIX}/img/blocks/${upgrade.namespace}/right.jpg`;
                this.setFavicon(`${URL_PREFIX}/img/blocks/${upgrade.namespace}/left.jpg`)
                break; 
        }

        if (!findBlockUpgradeByNamespace(upgrade.namespace)) {
            throw new IllegalStateError(`Upgrade with namespace "${upgrade.namespace} is not registered`)
        }

        blockUpgradeIndex.set(blockUpgrades.findIndex((upgr) => upgr.namespace === upgrade.namespace));
    }

    setFavicon(url:string) {
        var link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = url;
    }
}