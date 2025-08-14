export class Transaction {
    title?: string;
    description?: string;
    amount?: number;
    date?: Date;

    constructor(data?: any) {
        if (data) {
            this.title = data.title;
            this.description = data.description;
            this.amount = data.amount;
            this.date = new Date(data.date);
        }
    }

}