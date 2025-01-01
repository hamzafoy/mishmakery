import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MishmakeryService {
  private configUrl = 'assets/g-form.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  getIframeConfig(): Observable<any> {
    return this.http.get<any>(this.configUrl);
  }
}