import { formatDate } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { DxSelectBoxComponent } from 'devextreme-angular';

import { AllTasks } from '../allTasks.interface';
import { AllTasksService } from '../allTasks.service';

@Component({
    selector: 'first-comp',
    templateUrl: './first-Div.component.html',
    styleUrls: ['./first-Div.component.css']
})

export class FirstComponent implements OnInit, OnDestroy {
    
    description: string = '';
    priority: string = 'Низкий';
    statuses: string[] = ['Низкий', 'Средний', 'Высокий'];

    firstPartOfTime: string = '';
    secondPartOfTime: string = '';

    constructor(public service: AllTasksService) {}

    ngOnInit(): void {
        
    }

    makeDate(): void{
        let currentTime = new Date();
        this.firstPartOfTime = formatDate(currentTime, 'dd-MM-yyyy', 'en-US', '+0300') + '';
        this.secondPartOfTime = formatDate(currentTime, 'HH:mm','en-US', '+0300') + '';
    }

    onValueChanged(e: any) {
        this.priority = e.value;
    }

    public addNewTask(params: any): void {
        if (params.validationGroup.validate().isValid) {
            this.makeDate();
            let someTask: AllTasks = {
                description: this.description,
                priority: this.priority,
                status: 1,
                date: this.firstPartOfTime + ' ' + this.secondPartOfTime,
                descOfStatus: '',
            }
            this.service.postData(someTask);
            this.description = "";
        }
    }

    ngOnDestroy(): void {
        
    }
}