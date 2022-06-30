import {Component} from '@angular/core';
import { FiltersService } from '../filters.service';

@Component({
    selector: 'second-comp',
    templateUrl: './second-Div.component.html',
    styleUrls: ['./second-Div.component.scss']
})

export class SecondComponent {
    
    theOrder: string = 'reverse';
    buttonDescription: string = 'По возрастанию';

    checkedInputs: string[] = ['1','3','2','Низкий','Средний','Высокий'];

    constructor(public filterService: FiltersService) {}

    sortByDate(): void {
        this.filterService.reverseArray(this.theOrder);
        if(this.buttonDescription == 'По возрастанию'){
            this.buttonDescription = 'По убыванию';
            this.theOrder = 'normal';
        } else  {
            this.buttonDescription = 'По возрастанию';
            this.theOrder = 'reverse';
        }
    }

    checkValue(event: any, index: number, value: string): void{
        if (event.value == true) {
            this.checkedInputs[index] = value;
        } else {
            this.checkedInputs[index] = '';
        }
        this.filterService.useChecks(this.checkedInputs);
    }
}