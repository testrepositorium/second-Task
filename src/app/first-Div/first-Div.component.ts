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

    firstPartOfTime: string = '';
    secondPartOfTime: string = '';
    makeDate(): void{
        let currentTime = new Date();
        this.firstPartOfTime += formatDate(currentTime, 'dd-MM-yyyy', 'en-US', '+0300');
        this.secondPartOfTime += formatDate(currentTime, 'HH:mm','en-US', '+0300');
    }

    constructor(public service: AllTasksService) {}

    public addNewTask(): void {
        this.makeDate();
        let someTask: AllTasks = {
            description: this.description,
            priority: '',
            status: 1,
            date: this.firstPartOfTime + ' ' + this.secondPartOfTime,
            descOfStatus: '',
        }
        this.service.postData(someTask);
        this.description = "";
    }
    ngOnInit(): void {
        
    }
    ngOnDestroy(): void {
        
    }
}