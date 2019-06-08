
import { Injectable } from '@angular/core';

import { Celular } from './celulares';

@Injectable()
export class CelularDataService {

    lastId: number = 0;

    celular: Celular[] = [];

    constructor() { }

    addTodo(celular: Celular): CelularDataService {
        if (!celular.id) {
            celular.id = ++this.lastId;
        }
        this.celular.push(celular);
        return this;
    }

    deleteTodoById(id: number): CelularDataService {
        this.celular = this.celular
            .filter(todo => todo.id !== id);
        return this;
    }

    updateTodoById(id: number, values: Object = {}): Celular {
        let celular = this.getCelularById(id);
        if (!celular) {
            return null;
        }
        Object.assign(celular, values);
        return celular;
    }

    getAllCelulares(): Celular[] {
        return this.celular;
    }

    getCelularById(id: number): Celular {
        return this.celular
            .filter(celular => celular.id === id)
            .pop();
    }

    getCelularByMarca(marca: string): Celular {
        return this.celular
            .filter(celular => celular.marca === marca)
            .pop();
    }

    likeUp(celular: Celular) {
        this.getCelularByMarca(celular.marca).like++;
    }

    dislikeUp(celular: Celular) {
        this.getCelularByMarca(celular.marca).dislike++;
    }
}