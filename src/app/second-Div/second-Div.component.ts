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

    sortByDate(event: any): void {
        this.filterService.reverseArray(this.theOrder);
        if(event.component.option('text') == 'По возрастанию'){
            event.component.option('text','По убыванию');
            this.theOrder = 'normal';
        } else  {
            event.component.option('text','По возрастанию');
            this.theOrder = 'reverse';
        }
        console.log(event.component.option('text'));  // Свойство меняется, а описание у кнопки все равно остается прежним
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