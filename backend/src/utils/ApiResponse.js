export class ApiResponse {
    constructor(statusCode = 200, massage, data = {}) {
        this.statusCode = statusCode;
        this.massage = massage;
        this.success = true;
        this.data = data;
    }
}