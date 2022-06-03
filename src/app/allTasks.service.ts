import { Injectable } from "@angular/core";
import { Observable, lastValueFrom } from "rxjs";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { AllTasks } from "./allTasks.interface";


@Injectable({
    providedIn: 'root'
})
export class AllTasksService {

    constructor(private http: HttpClient) {}

    postData(task: AllTasks) {
        return this.http.post('http://localhost:3000/items', task).toPromise()
        .then((res) => this.getData());
    }
    getData() : Observable<AllTasks[]> {
        return this.http.get('http://localhost:3000/items').pipe(map((data:any)=> {
            return data;
        }));
    }
}


