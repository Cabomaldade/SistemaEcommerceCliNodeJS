export class Todo {
    id: number;
    titulo: string;
    completo: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}