import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  public searchValue = '';

  @Output()
  handleSearch = new EventEmitter<string | undefined>();

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(500), // délai de 300ms
        distinctUntilChanged(),
      )
      .subscribe(searchValue => {
        this.handleSearch.emit(searchValue);
      });
  }

  onInputChange() {
    this.searchSubject.next(this.searchValue);
  }
}
