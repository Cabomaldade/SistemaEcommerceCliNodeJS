import { AuthGuard } from './login/login-guard';
import { LoginServiceService } from './login/login-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './app.router';
import { LoginComponent } from './login/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './httpErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginServiceService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
