import { Injectable } from '@angular/core';  
import { BehaviorSubject, Subject } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class SuggestionsService {  
  private selectedSuggestion = new Subject<string>();  
  private removeSuggestionIndex = new Subject<number>();  
  selectedSuggestion$ = this.selectedSuggestion.asObservable();      
  removeSuggestionIndex$ = this.removeSuggestionIndex.asObservable();  
  
  private architectureSuggestion = new BehaviorSubject<any>(null);  
  currentSuggestion = this.architectureSuggestion.asObservable();  
    
  removeSuggestion(index: number) {  
    this.removeSuggestionIndex.next(index);  
  }  
    
  selectSuggestion(suggestion: string) {  
    this.selectedSuggestion.next(suggestion);  
  }  

  changeArchitectureSuggestion(suggestion: any) {  
    this.architectureSuggestion.next(suggestion);  
  } 
}  
