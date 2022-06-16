import {Component, OnInit} from '@angular/core';
import { AllTasks } from '../allTasks.interface';
import { AllTasksService } from '../allTasks.service';


@Component({
    selector: 'third-comp',
    templateUrl: './third-Div.component.html',
    styleUrls: ['./third-Div.component.css']
})

export class ThirdComponent implements OnInit {

    public arrayOfTasks: any[] = [];
    colorOfPriority: string ='';

    constructor(public service: AllTasksService) {}

    deleteTask(data: any) : void {
        this.service.deleteData(data);
    }

    showInput(data: any) {
        let element = <HTMLElement>document.querySelector(`#someTask${data.id}`);
        element.innerHTML = 
        `
        <div class="newElement1">
            <input type="text" class="newFieldsForInf" id="newFieldOfInformation${data.id}" value="${data.description}">
        </div>
        <div class="newElement2">
            <button type="button" onclick="change(${data.id})">Ок</button> 
        </div>
        `
    };

    change(data: any){
        console.log('Ну пиздец тебе');
    }

    ngOnInit(): void{ 
        this.service.getData()
        this.service.data$.subscribe((data: AllTasks[]) => {
            this.arrayOfTasks = data;
        });
    }
}

/* 
        <div class="newElement1">
            <input type="text" class="newFieldsForInf" id="newFieldOfInformation${data.id}" value="${data.description}">
        </div>
        <div class="newElement2">
            <button type="button" (click)="change(${data.id})">Ок</button> 
        </div>
        */