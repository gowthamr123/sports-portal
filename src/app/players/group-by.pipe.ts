import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(data: any, property: string): any {
    if(!data) {
      return null;
  }

  const groupedCollection = data.reduce((previous, current, currentIndex)=> {
      current['index'] = currentIndex;
      if(!previous[current[property]]) {
          previous[current[property]] = [current];
      } else {
          previous[current[property]].push(current);
          
      }
      return previous;
  }, {});

  // this will return an array of objects, each object containing a group of objects
  return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

}
