import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing-module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
