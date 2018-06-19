import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSortingService {

  constructor() { }

  sortObjectsByKey(objects: any[], key: string): any[] {
    function compare(a, b) {
      // const genreA = a.genre.toUpperCase();
      // const genreB = b.genre.toUpperCase();
      const genreA = a[key];
      const genreB = b[key];
      let comparison = 0;
      if (genreA > genreB) {
        comparison = 1;
      } else if (genreA < genreB) {
        comparison = -1;
      }
      return comparison;
    }
  return objects.sort(compare);
  }
}
