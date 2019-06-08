import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './login/login-guard';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    { 
        path: 'clientes',
        loadChildren: 'app/clientes/clientes.module#ClientesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'todo',
        loadChildren: 'app/todo/todo.module#TodoModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'enquete',
        loadChildren: 'app/enquete/enquete.module#EnqueteModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'signin',
        component: LoginComponent
    }
];
export const RoutingModule = RouterModule.forRoot(routes);