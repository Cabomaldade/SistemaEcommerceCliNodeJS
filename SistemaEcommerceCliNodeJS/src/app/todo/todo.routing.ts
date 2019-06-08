import { Routes, RouterModule } from "@angular/router";
import { TodoComponent } from "./todo.component";



const TODO_ROUTES: Routes = [

    {
        path: '',
        component: TodoComponent
    }

];
export const todoRouting = RouterModule.forChild(TODO_ROUTES);