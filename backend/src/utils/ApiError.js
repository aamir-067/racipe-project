export class ApiError extends Error {
    constructor(statusCode, massage = "Something went wrong", errors = []) {
        this.message = massage;
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        super(massage);
    }
}