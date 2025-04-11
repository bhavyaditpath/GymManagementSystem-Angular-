import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Base URL for the API
  private baseUrl: string = 'https://localhost:7280/api/';
  constructor(private http: HttpClient) {}

  getData<T>(endpoint: string, params?: any): Observable<T> {
    console.log('Calling API:', this.baseUrl + 'Member', 'with params:', params);
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<T>(url, { params });
  }

  getDataWithParams<T>(url: string, params: any): Observable<T> {
    const fullUrl = this.baseUrl + url;
    return this.http.get<T>(fullUrl, { params });
  }

  postData<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, data);
  }

  putData<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, data);
  }

  patchData<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  deleteData<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  }


}
