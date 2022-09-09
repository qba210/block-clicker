import type { UpgradeValues } from ".";

export default interface ArbitiaryUpgrade {
    title: string;
    description: string;
    namespace: string;
    icon: string,
    price: number,
    upgradeValues: UpgradeValues
}