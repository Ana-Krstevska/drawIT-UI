import { Injectable } from '@angular/core';  
import { Subject } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class SuggestionsService {  
  private selectedSuggestion = new Subject<string>();  
  private removeSuggestionIndex = new Subject<number>();  
  selectedSuggestion$ = this.selectedSuggestion.asObservable();      
  removeSuggestionIndex$ = this.removeSuggestionIndex.asObservable();  
    
  removeSuggestion(index: number) {  
    this.removeSuggestionIndex.next(index);  
  }  
    
  selectSuggestion(suggestion: string) {  
    this.selectedSuggestion.next(suggestion);  
  }  
}  
