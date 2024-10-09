import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DrawingRequest } from '../models/drawing-request.model';
import { SuggestionRequest } from '../models/suggestion-request';

@Injectable({
  providedIn: 'root'
})
export class DrawingAPIService {
  private drawingRequest!: DrawingRequest;
  private suggestionRequest!: SuggestionRequest;
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

  sendServices(cloud: number, cloudServices: string[]): Observable<SuggestionRequest> {  
    const body = {  
      cloud: cloud,  
      cloudServices: cloudServices  
    };  
    return this.http.post<SuggestionRequest>(`${this.apiUrl}SearchSuggestions`, body)  
      .pipe(tap((response: SuggestionRequest) => {    
        this.suggestionRequest = response;    
      }));   
  }    

  getDrawingRequest(): DrawingRequest {  
    return this.drawingRequest;  
  }  
}

