export class Account {
    name?: string;
    imageUrl?: string;
    balance?: number;

    constructor(data?: any) {
        if (data) {
            this.name = data.name;
            this.imageUrl = data.imageUrl;
            this.balance = data.balance;
        }
    }

}