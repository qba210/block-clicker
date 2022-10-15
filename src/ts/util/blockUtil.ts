import { URL_PREFIX } from "../config";
import type { BlockUpgrade } from "../upgrades";
import type ArbitiaryUpgrade from "../upgrades/arbitiaryUpgrade";

export default class BlockUtil {
    static GetBlockTexture(upgrade: BlockUpgrade, side: "left" | "right" | "top") {
        switch (upgrade.textureMode) {
            case "all": 
                return `${URL_PREFIX}/img/blocks/${upgrade.namespace}/all.${upgrade.imageExtension}`;
            case "bottomtop": 
                return `${URL_PREFIX}/img/blocks/${upgrade.namespace}/${side === "top" ? "top" : "bottom"}.${upgrade.imageExtension}`;
            case "sided": 
                return `${URL_PREFIX}/img/blocks/${upgrade.namespace}/${side}.${upgrade.imageExtension}`;
        }
    }
}