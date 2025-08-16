export class Category {
    id?: number;
    name?: string;
    type?: string;
    color?: string;

    constructor(data?: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.type = data.type;
            this.color = data.color;
        }
    }
}