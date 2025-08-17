export class Category {
    id?: number;
    name?: string;
    type?: string;
    icon?: string;
    color?: string;

    constructor(data?: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.type = data.type;
            this.icon = data.icon;
            this.color = data.color;
        }
    }
}