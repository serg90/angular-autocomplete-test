import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { CitiesService } from './cities.service';
import { City } from './models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  inputControl = new FormControl();
  cities$: Observable<City[]> = of([]);
  selectedCity = new City();

  constructor(private service: CitiesService) { }

  ngOnInit(): void { this.cities$ = this.service.getCities(); }

  onAutocompleteItemClick(city: City) {
    this.selectedCity = Object.assign({}, city);
    console.log(this.selectedCity)  
  }
  
}
