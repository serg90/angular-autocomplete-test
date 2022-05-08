import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { api } from 'src/common';
import { City } from './models/city';

const prefix = "cities";

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCities():Observable<City[]> {
    return this.http.get<any>(api.baseUrl + prefix);
  }
}
