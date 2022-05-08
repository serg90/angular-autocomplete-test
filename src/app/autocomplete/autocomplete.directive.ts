import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { AutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit {
  @Input() appAutocomplete!: AutocompleteComponent;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit(): void {
    fromEvent(this.origin, 'focus')
      .subscribe(() => {
        this.openDropdown();

        // this.appAutocomplete.optionsClick()
        //   .pipe(takeUntil(this.overlayRef.detachments()))
        //   .subscribe(( value: string ) => {
        //     this.control.setValue(value);
        //     this.close();
        //   });
      });
  }

  get control() {
    return this.ngControl.control;
  }

  get origin() {
    return this.host.nativeElement;
  }

  openDropdown() {
    console.log('openning list!');
  }

  close() {
    console.log('closing list!');
  }

}
