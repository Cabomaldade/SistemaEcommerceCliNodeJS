import { CelularDataService } from './celular-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnqueteComponent } from './enquete.component';
import { enqueteRouting } from './enquete.routing';


@NgModule({
  imports: [
    CommonModule,enqueteRouting
  ],
  declarations: [EnqueteComponent],
  providers: [CelularDataService]
})
export class EnqueteModule { }
