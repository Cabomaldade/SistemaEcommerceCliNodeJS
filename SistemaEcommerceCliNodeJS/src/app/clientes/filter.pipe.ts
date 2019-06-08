import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        return items.filter(it =>  {
            return Object.keys(it).some(k =>  
                it[k].toString().toLowerCase()
                .includes(searchText.toLowerCase()));
        });
    }
}