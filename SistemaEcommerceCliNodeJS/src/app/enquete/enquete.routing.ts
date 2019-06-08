import { Routes, RouterModule } from "@angular/router";
import { EnqueteComponent } from "./enquete.component";



const TODO_ROUTES: Routes = [

    {
        path: '',
        component: EnqueteComponent
    }

];
export const enqueteRouting = RouterModule.forChild(TODO_ROUTES);