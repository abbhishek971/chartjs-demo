import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsRoutingModule } from './analytics.routing-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnalyticsRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule { }
