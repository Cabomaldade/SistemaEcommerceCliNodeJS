
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { TodoDataService } from './todo-data.service';
import { TodoComponent } from './todo.component';
import { todoRouting } from './todo.routing';


@NgModule({
  imports: [
    CommonModule,FormsModule,todoRouting
  ],
  declarations: [TodoComponent],
  providers: [TodoDataService]
})
export class TodoModule { }
