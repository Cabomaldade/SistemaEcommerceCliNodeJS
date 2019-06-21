import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //public token: string;  Usado para implementar o Interceptor + avancado.

  private uri: string = "http://localhost:8080/login";

  private uri2: string = "http://localhost:3000/login"; // criado o back no NodeJs

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;
  //private logue = false; usarei no intercept

  constructor(private router: Router, private http: Http) { }
  //const currentUser = JSON.parse(localStorage.getItem('currentUser')); sera para o Intercept
  //this.token = currentUser && currentUser.token; sera para o Intercept
  //alert(this.token); sera para o Intercept


  signIn(user: User) {
    this.postLogin(user).subscribe(
      us => {
        if (us.status === 200) { //Fazendo assim e buscando só pela resposta
          this.authenticated = true;
          this.showNavBar(true);
          this.router.navigate(['/']);
        } else {
          this.authenticated = false;
          this.showNavBar(false);
          this.router.navigate(['/signin'])
          alert("Usuário ou senha inválidos");

        }
      },
      err => { console.log(err) }
    );
  }

  postLogin(user: User): Observable<Response> {
    return this.http.post(`${this.uri2}` + "/obtendo-id", user, { headers: this.getHeaders() })
      .map((res: Response) => res)
      .catch(this.handleError);
  }


  isAuthenticated() {
    return this.authenticated;
  }

  private showNavBar(ifShow: boolean) {
    this.showNavBarEmitter.emit(ifShow);
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  logout(): void {
    // Limpa o token removendo o usuário do local store para efetuar o logout
    //this.token = null; --> para implementar o Intercept
    //localStorage.removeItem('currentUser'); --> para implementar o Intercept
    this.authenticated = false;
    this.showNavBar(false);
    this.router.navigate(['/signin']);
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    let erro = error.messsage || 'Server error';
    console.log('Ocorreu um erro ', error);
    return Observable.throw(erro);
  }


  /*  us => {
      if (HttpResponse.toString === "200") {
        this.authenticated = true;
        this.showNavBar(true);
        this.router.navigate(['/']);
      } else { this.authenticated = false;}
    },  
    err => {console.log("Está Autenticado : " + this.authenticated)}
  )*/
  /*this.getLogin(user).subscribe(test =>  console.log("Entrou Aqui!" + user.email)); funfou aqui!

  this.getLogin(user).subscribe(this.getLogin);

  if((user.email === 'test@test.com' || user.email === 'user@user.com' && user.password === '12345')) {
    this.authenticated = true;
    this.showNavBar(true);
    this.router.navigate(['/']);
  } else{
    this.authenticated = false;  // O intercept vai melhorar essa logica aqui.
  }
}

  

  getAll(): Observable<User[]> {
    return this.http.get(`${this.uri2}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  singIn2(user: User) {
    this.get(user.email, user.password).subscribe(
      us => {
        if (us.email === user.email) {
          this.authenticated = true;
          this.showNavBar(true);
          this.router.navigate(['/']);
        } else {
          this.authenticated = false;
          this.showNavBar(false);
          this.router.navigate(['/signin']);
        }
      },
      err => { console.log(err) }
    );
  }

  get(email: string, password: string) {
    return this.getAll()
           .map((list: any) => list.find(user => (user.email == email) && (user.password == password)))
           .catch(this.handleError);
  }

  */

  private guardarResp(response: Response) {

  }
}
