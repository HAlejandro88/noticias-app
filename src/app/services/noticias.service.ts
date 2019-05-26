import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=1152c90f7c904a1e9bc3745f2408653d`);
  }
}
