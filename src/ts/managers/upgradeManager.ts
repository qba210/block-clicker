import { blockUpgrades, findBlockUpgradeByNamespace, type BlockUpgrade } from "../upgrades";
import type ArbitiaryUpgrade from "../upgrades/arbitiaryUpgrade";
import * as Localization from "../localization"
import IllegalStateError from "../errors/IllegalStateError";

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

export class UpgradeManager {
    left: HTMLImageElement;
    top: HTMLImageElement;
    right: HTMLImageElement;

    getters: BlockGetters;
    setters: BlockSetters;

    blockUpgradeIndex: number = 0;
    
    constructor(leftSide: HTMLImageElement, topSide: HTMLImageElement, rightSide: HTMLImageElement, getters: BlockGetters, setters: BlockSetters) {
        this.left = leftSide;
        this.top = topSide;
        this.right = rightSide;
        this.getters = getters;
        this.setters = setters;
    }

    static toArbitiaryBlock(upgrade: BlockUpgrade): ArbitiaryUpgrade {
        let localized = Localization.getLocalizedUpgrade(upgrade.namespace) ?? {title: undefined, description: undefined};

        return {
            description: localized.description,
            title: localized.title,
            namespace: upgrade.namespace,
            icon: "/img/placeholder.png",
            price: upgrade.price,
            upgradeValues: upgrade.upgradeValues
        }
    }

    static fromArbitiaryBlock(upgrade: ArbitiaryUpgrade): BlockUpgrade {
        return blockUpgrades.find((upgr) => upgr.namespace === upgrade.namespace)!;
    }

    GetBlockUpgradeIndex() {
        return this.blockUpgradeIndex;
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
        if (upgrade && this.getters.getBlocks() >= upgrade.price) {
            this.ForceApplyBlockUpgrade(upgrade);
            return true;
        }
        return false;
    }

    ForceApplyBlockUpgrade(upgrade: BlockUpgrade) {
        
        this.setters.setBlocks(this.getters.getBlocks() - upgrade.price);
        this.setters.setBps(this.getters.getBps() + upgrade.upgradeValues.bps);
        this.setters.setMultiplier(this.getters.getMultiplier() + upgrade.upgradeValues.multiplier);

        

        switch (upgrade.textureMode) {
            case "all":
                this.left.src = `/img/blocks/${upgrade.namespace}/all.jpg`;
                this.top.src = `/img/blocks/${upgrade.namespace}/all.jpg`;
                this.right.src = `/img/blocks/${upgrade.namespace}/all.jpg`;
                this.setFavicon(`/img/blocks/${upgrade.namespace}/all.jpg`);
                break;

            case "bottomtop":
                this.left.src = `/img/blocks/${upgrade.namespace}/bottom.jpg`;
                this.top.src = `/img/blocks/${upgrade.namespace}/top.jpg`;
                this.right.src = `/img/blocks/${upgrade.namespace}/bottom.jpg`;
                this.setFavicon(`/img/blocks/${upgrade.namespace}/bottom.jpg`);
                break;
            
            case "sided":
                this.left.src = `/img/blocks/${upgrade.namespace}/left.jpg`;
                this.top.src = `/img/blocks/${upgrade.namespace}/top.jpg`;
                this.right.src = `/img/blocks/${upgrade.namespace}/right.jpg`;
                this.setFavicon(`/img/blocks/${upgrade.namespace}/left.jpg`)
                break; 
        }

        if (!findBlockUpgradeByNamespace(upgrade.namespace)) {
            throw new IllegalStateError(`Upgrade with namespace "${upgrade.namespace} is not registered`)
        }

        this.blockUpgradeIndex = blockUpgrades.findIndex((upgr) => upgr.namespace === upgrade.namespace);
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