import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DrawingRequest } from '../models/drawing-request.model';

@Injectable({
  providedIn: 'root'
})
export class DrawingAPIService {
  private drawingRequest!: DrawingRequest;
  private apiUrl = 'https://localhost:44382/drawIT/';  

  constructor(private http: HttpClient) { }  

  getAzureServices(): Observable<any> {  
    return this.http.get(`${this.apiUrl}GetAzureServices`);  
  }  

  getAWSServices(): Observable<any> {  
    return this.http.get(`${this.apiUrl}GetAWSServices`);  
  }  

  sendPrompt(cloud: number, cloudServices: string[], userDescription: string): Observable<DrawingRequest> {  
    const request = {  
      cloud: cloud,  
      cloudServices: cloudServices,  
      userDescription: userDescription  
    };  
  
    return this.http.post<DrawingRequest>(`${this.apiUrl}ProcessPrompt`, request)  
      .pipe(tap((response: DrawingRequest) => {  
        this.drawingRequest = response;  
      }));  
  }

  getDrawingRequest(): DrawingRequest {  
    return this.drawingRequest;  
  }  
}

