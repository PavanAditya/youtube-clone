import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewMore'
})
export class ViewMorePipe implements PipeTransform {

  transform(value: string, togglePipe: boolean): string {
    if (value.length > 250 && togglePipe) {
      return value.substring(0, 250) + '...';
    } else {
      return value;
    }
  }

}
