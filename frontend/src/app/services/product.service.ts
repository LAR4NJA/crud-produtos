import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  listar(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  cadastrar(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  editar(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
