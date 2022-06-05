import { Injectable } from "@angular/core";
import { Observable, lastValueFrom, BehaviorSubject } from "rxjs";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { AllTasks } from "./allTasks.interface";


@Injectable({
    providedIn: 'root'
})
export class AllTasksService {

    private _data$$: BehaviorSubject<any> =  new BehaviorSubject<any>(null);
    public data$: Observable<any> = this._data$$.asObservable();

    constructor(private http: HttpClient) {}

    postData(task: AllTasks) {
        return this.http.post('http://localhost:3000/items', task).toPromise()
        .then((res) => this.getData());
    }
    getData() : void {
        this.http.get('http://localhost:3000/items').toPromise()
            .then((res) => {
                if(res) {
                    this._data$$.next(res);
                }
            })
    }
}


