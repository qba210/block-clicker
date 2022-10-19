import type { UpgradeValues } from ".";

export interface OtherUpgrade {
    namespace: string;
    imageExtension: "jpg" | "png";
    price: number;
    upgradeValues: UpgradeValues;
}

export const pickaxeUpgrades: OtherUpgrade[] = [
    {
        namespace: "pickaxe-wood",
        imageExtension: "png",
        price: 100,
        upgradeValues: {
            bps: 0.2,
            multiplier: 0.1
        }
    }
]