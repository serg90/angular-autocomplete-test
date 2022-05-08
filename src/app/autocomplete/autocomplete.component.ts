import { Component, ContentChild, ContentChildren, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutocompleteContentDirective } from './autocomplete-content.directive';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'appAutocomplete',
})
export class AutocompleteComponent {
  @ViewChild('root') rootTemplate!: TemplateRef<any>;

  @ContentChild(AutocompleteContentDirective)
  content!: AutocompleteContentDirective;

  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;

  optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options?.map((option:OptionComponent) => option.click$);
        return merge(...clicks$);
      })
    );
  }
}
