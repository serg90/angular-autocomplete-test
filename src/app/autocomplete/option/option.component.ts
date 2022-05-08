import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() value!: string;  
  public click$!: Observable<string>;
  
  constructor(private host: ElementRef) {}  
  
  ngOnInit() {  
    this.click$ = fromEvent(this.host.nativeElement, 'click').pipe(map(() => this.value));
  }  

}
