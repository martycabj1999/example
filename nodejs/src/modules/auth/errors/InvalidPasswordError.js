export default class InvalidPasswordError extends Error {
    constructor() {
        super()
        this.message = 'The current password does not match the system password'
    }
}
