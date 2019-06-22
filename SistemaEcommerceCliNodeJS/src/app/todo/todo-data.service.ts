import { Injectable } from '@angular/core';

import { Todo } from './todo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TodoDataService {

    lastId: number = 0;

    todos: Todo[] = [];

    private url: string = "http://localhost:3000/todo";

    constructor(private httpClient: HttpClient) { }

    addTodo(todo: Todo): TodoDataService {
        console.log(todo);
        if (!todo.id) {
            todo.id = ++this.lastId;
        }
        this.todos.push(todo);
        this.addTodoComBack(todo)
            .subscribe(resposta => {
                if (resposta) {
                    console.log("cadastrou")
                }
            });

        return this;
    }
    // adicionar no back --- Postar os TODO no back
    addTodoComBack(todo: Todo): Observable<Todo> {
        console.log("incluir");
        return this.httpClient.post<Todo>(`${this.url}`, todo);
    }


    // adicionando para interagir a deleção no back
    removeTodoComBack(id): Observable<Todo> {
        console.log("deletar");
        return this.httpClient.delete<Todo>(`${this.url}/${id}`);
    }

    deleteTodoById(id: number): TodoDataService {
        this.todos = this.todos
            .filter(todo => todo.id !== id);

        this.removeTodoComBack(id)
            .subscribe(resposta => {
                if (resposta) {
                    console.log("deletou")
                }
            });
        return this;
    }

    updateTodoById(id: number, values: Object = {}): Todo {
        let todo = this.getTodoById(id);
        if (!todo) {
            return null;
        }
        Object.assign(todo, values);
        return todo;
    }

    getAllTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: number): Todo {
        return this.todos
            .filter(todo => todo.id === id)
            .pop();
    }

    toggleTodoCompleto(todo: Todo) {
        let updatedTodo = this.updateTodoById(todo.id, {
            completo: !todo.completo
        });
        return updatedTodo;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            alert(error.error.message);
        } else if (error.status == 404) {
            alert("Usuário ou Senha Inválidos");
        }
    }
}