import {Component, OnInit} from '@angular/core';
import { AllTasksService } from '../allTasks.service';
import { formatDate } from '@angular/common';
import { FiltersService } from '../filters.service';


@Component({
    selector: 'third-comp',
    templateUrl: './third-Div.component.html',
    styleUrls: ['./third-Div.component.css']
})

export class ThirdComponent implements OnInit {

    public arrayOfTasks: any[] = [];

    arrayOfCompletedTasks: any[] = [];
    arrayOfActiveTasks: any[] = [];
    arrayOfCanceledTasks: any[] = [];

    visibilityArray: boolean[] = [];

    arrayForChecks: string[] = ['3','2','Низкий','Средний','Высокий'];
    statusOfReverse: string = 'normal';

    constructor(public service: AllTasksService, public filterService: FiltersService) {}

    deleteTask(data: any) : void {
        this.service.deleteData(data);
    }

    showInput(data: any): void {
        this.visibilityArray[data.id-1] = !this.visibilityArray[data.id-1];
    };

    change(id: number): void{
        let objectForChange = this.arrayOfTasks.find((task) => task.id == id);
        this.service.changeData(id, objectForChange);
    }

    checkVisibility(data1:number, data2: string) {
        if (data2 == 'first') {
            return this.visibilityArray[data1-1] === false ? false : true;
        } else {
            return this.visibilityArray[data1-1] === true ? false : true;
        }
    }

    changeTaskColor(id: number, newStatus: number, taskStatus: string): void {
        let objectForChange = this.arrayOfTasks.find((task) => task.id == id);
        objectForChange.status = newStatus;
        let currentTime = new Date();
        objectForChange.descOfStatus = taskStatus + formatDate(currentTime, 'dd-MM-yyyy', 'en-US', '+0300') + ' в ' + formatDate(currentTime, 'HH:mm','en-US', '+0300') + '';
        this.service.changeData(id, objectForChange);
    }

    makeArrays(data: any): void {
        this.arrayOfActiveTasks = [];
        this.arrayOfCanceledTasks = []; 
        this.arrayOfCompletedTasks = [];
        if (data != null && data.length > 0) {
            for (let i = 0; i<=data.length - 1; ++i) {
                if (data[i].status == this.arrayForChecks[0] || data[i].status == this.arrayForChecks[1] || data[i].priority == this.arrayForChecks[2] || data[i].priority == this.arrayForChecks[3] || data[i].priority == this.arrayForChecks[4]) {
                        switch(data[i].status) {
                        case 1:
                            this.arrayOfActiveTasks.push(data[i]);
                            break;
                        case 2:
                            this.arrayOfCompletedTasks.push(data[i]);
                            break;                            
                        default:
                            this.arrayOfCanceledTasks.push(data[i]);
                        }
                }
            }
            if (this.statusOfReverse == 'reverse') {
                this.arrayOfCompletedTasks.reverse();
                this.arrayOfActiveTasks.reverse();
                this.arrayOfCanceledTasks.reverse();  
            }
            for (let i = 0; i<=data[data.length-1].id-1; ++i){
                this.visibilityArray[i] =  false;
            }
        }
        this.arrayOfTasks = this.arrayOfCompletedTasks.concat(this.arrayOfActiveTasks, this.arrayOfCanceledTasks);
    }
    
    ngOnInit(): void{

        this.service.getData();
        this.service.data$.subscribe((data: any) => {
            this.makeArrays(data);
        });

        this.filterService.data$.subscribe((theOrder: string) => {
            this.statusOfReverse = theOrder;
            this.service.getData();
        });

        this.filterService.checks$.subscribe((allCheckBoxes: string[]) => {
            if (allCheckBoxes != null) {
                for(let i = 0; i<=4; ++i) {
                    this.arrayForChecks[i] = allCheckBoxes[i];
                }
                this.service.getData();
            }
        });

    }
}