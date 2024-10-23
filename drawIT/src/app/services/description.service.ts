import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
  private descriptions: { [key: string]: string } = {};  
  
  setDescription(description: string, theme: string) {  
    this.descriptions[theme] = description;  
  }  
    
  getDescription(theme: string): string {  
    return this.descriptions[theme] || '';  
  } 
}
