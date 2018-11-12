import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Devconroute } from './devconroute';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DevconrouteService {
  private devconrouteUrl = 'api/doc';
  constructor(private http: HttpClient) {}

  getDevconroute(devconroute: string): Observable<Devconroute> {
    const url = `${this.devconrouteUrl}/${devconroute}`;
    return this.http.get<Devconroute>(url);
  }
}
