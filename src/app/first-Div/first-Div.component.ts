import { formatDate } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AllTasks } from '../allTasks.interface';
import { AllTasksService } from '../allTasks.service';

@Component({
    selector: 'first-comp',
    templateUrl: './first-Div.component.html',
    styleUrls: ['./first-Div.component.scss']
})

export class FirstComponent implements OnInit, OnDestroy {
    
    statuses: string[] = ['Низкий', 'Средний', 'Высокий'];

    firstPartOfTime: string = '';
    secondPartOfTime: string = '';
    myForm: FormGroup;
    isCorrect: boolean = true;

    constructor(public service: AllTasksService) {
        this.myForm = new FormGroup({
            descriptionOfTask: new FormControl('', Validators.required),
            priorityOfTask: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.myForm.setValue({
            descriptionOfTask: '',
            priorityOfTask: 'Низкий'
        })
    }

    makeDate(): void{
        let currentTime = new Date();
        this.firstPartOfTime = formatDate(currentTime, 'dd-MM-yyyy', 'en-US', '+0300') + '';
        this.secondPartOfTime = formatDate(currentTime, 'HH:mm','en-US', '+0300') + '';
    }

    public addNewTask(): void {
        if (this.myForm.valid) { 
            this.isCorrect = true;
            this.makeDate();
            let someTask: AllTasks = {
                description: this.myForm.controls['descriptionOfTask'].value,
                priority: this.myForm.controls['priorityOfTask'].value,
                status: 1,
                date: this.firstPartOfTime + ' ' + this.secondPartOfTime,
                descOfStatus: '',
            }
            this.service.postData(someTask);
            this.myForm.controls['descriptionOfTask'].reset();
        } else {
            this.isCorrect = false;
        }
    }

    ngOnDestroy(): void {
        
    }
}