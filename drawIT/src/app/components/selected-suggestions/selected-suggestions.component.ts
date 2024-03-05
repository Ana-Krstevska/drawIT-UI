import { Component, OnInit } from '@angular/core';  
import { SuggestionsService } from 'src/app/services/suggestion.service';
  
@Component({  
  selector: 'app-selected-suggestions',  
  templateUrl: './selected-suggestions.component.html',  
  styleUrls: ['./selected-suggestions.component.scss']  
})  
export class SelectedSuggestionsComponent implements OnInit {  
  suggestions: string[] = [];  
  
  constructor(private suggestionsService: SuggestionsService) { }  
  
  ngOnInit() {  
    this.suggestionsService.selectedSuggestion$.subscribe(suggestion => {  
      this.suggestions.push(suggestion);  
      console.log(suggestion);  
    });  
  }  
  
  removeSuggestion(index: number) {    
    this.suggestions.splice(index, 1);  
    this.suggestionsService.removeSuggestion(index);  
  }  
  
}  
