import {Component, OnInit} from '@angular/core';
import { AllTasks } from '../allTasks.interface';
import { AllTasksService } from '../allTasks.service';


@Component({
    selector: 'third-comp',
    templateUrl: './third-Div.component.html',
    styleUrls: ['./third-Div.component.css']
})

export class ThirdComponent implements OnInit {

    public arrayOfTasks: AllTasks[] = [];

    constructor(public service: AllTasksService) {}

    ngOnInit(): void{
        this.service.getData()
        .subscribe((data: AllTasks[]) => {
            this.arrayOfTasks = data;
            console.log('привет');
        });
    }
}