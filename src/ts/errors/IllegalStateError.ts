export default class IllegalStateError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);

        this.name = "IllegalStateError";
    }
}