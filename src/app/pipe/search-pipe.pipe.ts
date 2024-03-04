// src/app/pipes/search-pipe.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(items: any[], term: string): any[] {
    if (!items || !term) {
      return items;
    }

    term = term.toLowerCase();

    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.category.name.toLowerCase().includes(term)
    );
  }
}
