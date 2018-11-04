import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing-module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
