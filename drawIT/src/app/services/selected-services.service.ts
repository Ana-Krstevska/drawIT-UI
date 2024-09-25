import { Injectable } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class SelectedServicesService {  
  private _selectedSuggestions = new BehaviorSubject<string[]>([]);  
  selectedSuggestions$ = this._selectedSuggestions.asObservable();  
  
  setSelectedSuggestions(suggestions: string[]): void {  
    this._selectedSuggestions.next(suggestions);  
  }  
}  
