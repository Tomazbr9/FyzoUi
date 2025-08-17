export class User {
    username?: string;
    email?: string;
    password?: string;

    constructor(data?: any) {
        if (data) {
            this.username = data.username;
            this.email = data.email;
            this.password = data.password;
        }
    }
}