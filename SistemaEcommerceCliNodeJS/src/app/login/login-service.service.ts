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

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //public token: string;  Usado para implementar o Interceptor + avancado.

  private uri: string = "http://localhost:8080/login";

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;
  //private logue = false; usarei no intercept

  constructor(private router: Router, private http: Http) { }
  //const currentUser = JSON.parse(localStorage.getItem('currentUser')); sera para o Intercept
  //this.token = currentUser && currentUser.token; sera para o Intercept
  //alert(this.token); sera para o Intercept


  signIn(user: User) {
    this.getLogin(user).subscribe(
      us => {
        if (us.email === user.email) {
          this.authenticated = true;
          this.showNavBar(true);
          this.router.navigate(['/']);
        }else{
          this.authenticated = false;
          this.showNavBar(false);
          this.router.navigate(['/signin']);
        }
      },
      err => { console.log(err) }
    );

    /*  us => {
        if (HttpResponse.toString === "200") {
          this.authenticated = true;
          this.showNavBar(true);
          this.router.navigate(['/']);
        } else { this.authenticated = false;}
      },  
      err => {console.log("Está Autenticado : " + this.authenticated)}
    )*/

  }


  /*this.getLogin(user).subscribe(test =>  console.log("Entrou Aqui!" + user.email)); funfou aqui!

  this.getLogin(user).subscribe(this.getLogin);

  if((user.email === 'test@test.com' || user.email === 'user@user.com' && user.password === '12345')) {
    this.authenticated = true;
    this.showNavBar(true);
    this.router.navigate(['/']);
  } else{
    this.authenticated = false;  // O intercept vai melhorar essa logica aqui.
  }
}*/

  getLogin(user: User): Observable<User> {
    return this.http.post(`${this.uri}`, user, {headers: this.getHeaders()})
      .map((res: Response) => res.json())
      .catch(this.handleError)
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
    console.log('Ocorreu um erro ' , error);
    return Observable.throw(erro);
  }

  private guardarResp(response: Response){
    
  }
}
