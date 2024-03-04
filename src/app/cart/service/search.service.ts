import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm = this.searchTermSource
    .asObservable()
    .pipe(distinctUntilChanged());

  changeSearchTerm(term: string): void {
    this.searchTermSource.next(term);
  }
}
