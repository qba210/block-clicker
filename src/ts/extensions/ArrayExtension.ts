export default {};

declare global {
    interface Array<T> {
        pick: () => T;
        last: () => T;
    }
}

Array.prototype.pick = function () {
    return this[Math.floor(Math.random()*this.length)]
}

Array.prototype.last = function () {
    return this[this.length-1]
}