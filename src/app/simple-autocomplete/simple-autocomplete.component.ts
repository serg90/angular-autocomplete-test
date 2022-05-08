import { AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, merge, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-simple-autocomplete',
  templateUrl: './simple-autocomplete.component.html',
  styleUrls: ['./simple-autocomplete.component.scss'],
  exportAs: 'simple-autocomplete'
})
export class SimpleAutocompleteComponent implements AfterViewInit, OnDestroy {
  @Input() control!: FormControl;
  @Input() list!: any[];
  @Input() propName!: string;
  @Output() itemSelected = new EventEmitter<any>();

  valueChangesSub$!: Subscription;
  
  constructor() { }
  
  ngAfterViewInit(): void {
    this.valueChangesSub$ = this.control.valueChanges
    .pipe(
      distinctUntilChanged(), 
      debounceTime(300))
    .subscribe(
      value => {
        const itemFound = this.list.find(c => c[this.propName]?.toLowerCase() === value?.toLowerCase());
        if (itemFound) {
          this.itemSelected.emit(itemFound);
        }
      }
      );
    }

    onItemClick(item: any) {
      this.control.setValue(item[this.propName], {emitEvent:false});
      this.itemSelected.emit(item);
    }
    
    ngOnDestroy(): void {
      if (this.valueChangesSub$) {
        this.valueChangesSub$.unsubscribe();
      }
    }
}
