import { Injectable } from '@angular/core';
import { data } from './../shared/data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor() { }
  getData(): Observable<Array<any>>{
    return of(data);
  }
}
