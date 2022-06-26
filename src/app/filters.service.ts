import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private _data$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$: Observable<any> = this._data$$.asObservable();

  constructor() { }

  reverseArray(data: string) {
    this._data$$.next(data);
  }

  private _checks$$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public checks$: Observable<any> =  this._checks$$.asObservable();

  useChecks(data: string[]) {
    this._checks$$.next(data);
  }
}
