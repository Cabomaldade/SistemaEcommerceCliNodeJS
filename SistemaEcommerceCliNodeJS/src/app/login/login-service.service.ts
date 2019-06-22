import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, Data } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  //public token: string;  Usado para implementar o Interceptor + avançado.

  //private uri: string = "http://localhost:8080/login";

  private uri2: string = "http://localhost:3000/login"; // criado o back no NodeJs

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authenticated = false;
  //private logue = false; usarei no intercept

  constructor(private router: Router, private httpClient: HttpClient, private http: Http) { }
  //const currentUser = JSON.parse(localStorage.getItem('currentUser')); sera para o Intercept
  //this.token = currentUser && currentUser.token; sera para o Intercept
  //alert(this.token); sera para o Intercept

  // com http Funcionando

  /*signIn(user: User) {
    this.postLogin(user).subscribe(
      us => {
        alert(us);
        if (us) { //Fazendo assim e buscando só pela resposta
          this.authenticated = true;
          this.showNavBar(true);
          this.router.navigate(['/']);
          console.log("entrou!");
        } else {
          this.authenticated = false;
          this.showNavBar(false);
          this.router.navigate(['/signin']);
        }
      },
      err => { console.log(err) }
    );
  }
  
  // com http Funcionando
  /*
  postLogin (user: User): Observable<Response> {
    return this.http.post(`${this.uri2}` + "/obtendo-id", user, {headers: this.getHeaders()})
      .map((res: Response) => res)
      .catch(this.handleError);      
  }
  */

  // tentativa com httpClient
  postLogin(user: User): Observable<any> {
    return this.httpClient.post(`${this.uri2}` + "/obtendo-id", user, { responseType: 'text' })
      .map((resposta: String) => resposta)
      .catch(this.handleError);
  }

  signIn(user: User) {
    this.postLogin(user).subscribe(
      (resposta => {
        if (resposta) {
          this.authenticated = true;
          this.showNavBar(true);
          this.router.navigate(['/']);
          console.log("entrou!");
        }
      }
      )
    );
  }

  isAuthenticated() {
    return this.authenticated;
  }

  private showNavBar(ifShow: boolean) {
    this.showNavBarEmitter.emit(ifShow);
  }

  /*
  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  */

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

  /*
  private handleError(error: any) {
    let erro = error.messsage || 'Server error';
    console.log('Ocorreu um erro ', error);
    return Observable.throw(erro);
  }*/

  // Obtido da documentação do Angular
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      alert(error.error.message);
    } else if (error.status == 404) {
      alert("Usuário ou Senha Inválidos");
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Algo deu errado');
  };


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

  
  private guardarResp(response: Response) {

  }

  */

}
