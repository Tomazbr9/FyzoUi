export class Transaction {
    title?: string;
    description?: string;
    amount?: number;
    date?: Date;
    type?: string;
    accountId?: number;
    categoryId?: number;

    constructor(data?: any) {
        if (data) {
            this.title = data.title;
            this.description = data.description;
            this.amount = data.amount;
            this.date = new Date(data.date);
            this.type = data.type;
            this.accountId = data.accountId;
            this.categoryId = data.categoryId;
        }
    }

}