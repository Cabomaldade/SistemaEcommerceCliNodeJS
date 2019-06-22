
import { Injectable, EventEmitter } from '@angular/core';

import { Celular } from './celulares';
import { Http, Headers} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class CelularDataService {

    lastId: number = 0;

    celular: Celular[] = [];

    private url: string = "http://localhost:3000/enquetes";

    celularChanged = new EventEmitter<Observable<Celular[]>>();

    constructor(private http: Http) { }

    getAll(): Observable<Celular[]> {
        return this.http.get(this.url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let erro = error.messsage || 'Server error';
        console.error('Ocorreu um erro ', error);
        return Observable.throw(erro);
    }

    update(cliente: Celular) {
        return this.http.patch(this.url, JSON.stringify(cliente),
            { headers: this.getHeaders() })
            .do(data => this.celularChanged.emit(this.getAll()))
            .catch(this.handleError);
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    /*
    addCelular(celular: Celular): CelularDataService {
        if (!celular.id) {
            celular.id = ++this.lastId;
        }
        this.celular.push(celular);
        return this;
    } // conforme regra não vou usar isso ainda

    deleteTodoById(id: number): CelularDataService {
        this.celular = this.celular
            .filter(todo => todo.id !== id);
        return this;
    } // conforme regra não vou usar isso ainda
    */

    updateCelularById(id: number, values: Object = {}): Celular {
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