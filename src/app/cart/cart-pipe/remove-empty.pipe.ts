import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeEmpty',
})
export class RemoveEmptyPipe implements PipeTransform {
  transform(products: any[]): any[] {
    return products.filter((ele) => ele.count > 0);
  }
}
