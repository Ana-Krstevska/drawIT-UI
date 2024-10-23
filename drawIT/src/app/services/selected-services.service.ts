import { Injectable } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class SelectedServicesService {  
  private selectedServices: { [key: string]: string[] } = {}; 
  private _selectedSuggestions = new BehaviorSubject<string[]>([]);  
  selectedSuggestions$ = this._selectedSuggestions.asObservable();  
  
  setSelectedSuggestions(suggestions: string[]): void {  
    this._selectedSuggestions.next(suggestions);  
  }  

  setSuggestions(suggestions: string[], theme: string) {  
    this.selectedServices[theme] = suggestions;  
  }  
    
  getSuggestions(theme: string): string[] {  
    return this.selectedServices[theme] || [];  
  } 
}  
