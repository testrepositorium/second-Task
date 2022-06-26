import { formatDate } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';

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

    firstPartOfTime: string = '';
    secondPartOfTime: string = '';
    makeDate(): void{
        let currentTime = new Date();
        this.firstPartOfTime = formatDate(currentTime, 'dd-MM-yyyy', 'en-US', '+0300') + '';
        this.secondPartOfTime = formatDate(currentTime, 'HH:mm','en-US', '+0300') + '';
    }

    constructor(public service: AllTasksService) {}

    public addNewTask(): void {
        if ((!!this.description != false || this.description == '0') && this.description != 'Поле текста задачи не может быть пустым!'){
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
        } else {
            this.description = 'Поле текста задачи не может быть пустым!';
        }
    }
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
        
    }
}