import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fruit {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FruitService {
  private apiUrl = 'http://localhost:3000/fruits';

  constructor(private http: HttpClient) { }

  getFruits(page: number, limit: number): Observable<Fruit[]> {
    const params = new HttpParams().set('_page', page).set('_limit', limit);
    return this.http.get<Fruit[]>(this.apiUrl, { params });
  }

  getFruit(id: number): Observable<Fruit> {
    return this.http.get<Fruit>(`${this.apiUrl}/${id}`);
  }

  addFruit(fruit: Fruit): Observable<Fruit> {
    return this.http.post<Fruit>(this.apiUrl, fruit);
  }

  updateFruit(fruit: Fruit): Observable<Fruit> {
    return this.http.put<Fruit>(`${this.apiUrl}/${fruit.id}`, fruit);
  }

  deleteFruit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
