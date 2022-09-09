import type { UpgradeValues } from ".";

export interface BlockUpgrade {
    namespace: string;
    textureMode: "all" | "sided" | "bottomtop";
    imageExtension: "jpg" | "png";
    price: number;
    upgradeValues: UpgradeValues;
}

export function findBlockUpgradeByNamespace(namespace: string) {
    return blockUpgrades.find((upgrade) => upgrade.namespace === namespace);
}

export const blockUpgrades: BlockUpgrade[] = [
    {
        namespace: "dirt",
        textureMode: "all",
        imageExtension: "jpg",
        price: 0,
        upgradeValues: {
            bps: 0,
            multiplier: 0
        }
    },
    {
        namespace: "grass",
        textureMode: "bottomtop",
        imageExtension: "jpg",
        price: 50,
        upgradeValues: {
            bps: 0.5,
            multiplier: 0.4
        }
    },
    {
        namespace: "log",
        textureMode: "bottomtop",
        imageExtension: "jpg",
        price: 125,
        upgradeValues: {
            bps: 1,
            multiplier: 1
        }
    },
    {
        namespace: "stone",
        textureMode: "all",
        imageExtension: "jpg",
        price: 200,
        upgradeValues: {
            bps: 1.5,
            multiplier: 1.3
        }
    },
    {
        namespace: "cobblestone",
        textureMode: "all",
        imageExtension: "jpg",
        price: 450,
        upgradeValues: {
            bps: 2.4,
            multiplier: 1
        }
    }
]