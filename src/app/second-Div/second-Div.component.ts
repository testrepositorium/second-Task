import {Component} from '@angular/core';
import { FiltersService } from '../filters.service';

@Component({
    selector: 'second-comp',
    templateUrl: './second-Div.component.html',
    styleUrls: ['./second-Div.component.css']
})

export class SecondComponent {
    
    theOrder: string = 'reverse';
    buttonDescription: string = 'По возрастанию';

    checkedInputs: string[] = ['3','2','Низкий','Средний','Высокий'];

    constructor(public filterService: FiltersService) {}

    sortByDate(): void {
        this.filterService.reverseArray(this.theOrder);
        if(this.buttonDescription == 'По возрастанию'){
            this.buttonDescription = 'По убыванию';
            this.theOrder = 'reverse';
        } else  {
            this.buttonDescription = 'По возрастанию';
            this.theOrder = 'normal';
        }
    }

    checkValue(event: any, index: number, value: string): void{
        if (event.currentTarget.checked == true) {
            this.checkedInputs[index] = value;
        } else {
            this.checkedInputs[index] = '';
        }
        this.filterService.useChecks(this.checkedInputs);
    }
}