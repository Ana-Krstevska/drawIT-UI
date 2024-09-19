import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawingAPIService {
  private apiUrl = 'https://localhost:44382/drawIT/';  

  constructor(private http: HttpClient) { }  

  getAzureServices(): Observable<any> {  
    return this.http.get(`${this.apiUrl}GetAzureServices`);  
  }  

  getAWSServices(): Observable<any> {  
    return this.http.get(`${this.apiUrl}GetAWSServices`);  
  }  

  sendPrompt(request: any): Observable<any> {  
    return this.http.post(`${this.apiUrl}ProcessPrompt`, request);  
  }  
}
