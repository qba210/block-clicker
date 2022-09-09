export default {};

declare global {
    interface Array<T> {
        pick: () => T;
    }
}

Array.prototype.pick = function () {
    return this[Math.floor(Math.random()*this.length)]
}