import { pickaxeUpgrades, type OtherUpgrade } from "../upgrades/otherUpgrades";
import * as Localization from "../localization"
import { URL_PREFIX } from "../config";
import { blocks, bps, multiplier, pickUpgradeIndex } from "./gameManager";
import { get } from "svelte/store";

export default class OtherUpgradeManager {
    static toArbitiaryUpgrade(upgrade: OtherUpgrade) {
        if (!upgrade) return undefined;

        let localized = Localization.getLocalizedOtherUpgrade(upgrade.namespace) ?? {title: undefined, description: undefined};
        let icon = `${URL_PREFIX}/img/other/${upgrade.namespace}.${upgrade.imageExtension}`;
        

        return {
            description: localized.description,
            title: localized.title,
            namespace: upgrade.namespace,
            icon,
            price: upgrade.price,
            upgradeValues: upgrade.upgradeValues,
            isBlockUpgrade: false
        }
    }

    static getNextPickUpgrade(): OtherUpgrade {
        return pickaxeUpgrades[get(pickUpgradeIndex) + 1];
    }

    static upgradePickToNext() {
        pickUpgradeIndex.update(val => val +1)
        
        this.adjustValuesForUpgrade(pickaxeUpgrades[get(pickUpgradeIndex)])
    }

    private static adjustValuesForUpgrade(upgrade: OtherUpgrade) {
        if (!upgrade) return;

        blocks.update(val => val - upgrade.price)
        bps.update(val => val + upgrade.upgradeValues.bps)
        multiplier.update(val => val + upgrade.upgradeValues.multiplier)
    }

}