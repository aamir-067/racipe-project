export class ApiResponse {
    constructor(status = 200, massage, data = {}) {
        this.status = status;
        this.massage = massage;
        this.success = true;
        this.data = data;
    }
}