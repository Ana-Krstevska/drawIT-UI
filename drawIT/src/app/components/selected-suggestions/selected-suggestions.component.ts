import { Component, OnInit } from '@angular/core';  
import { Subscription } from 'rxjs';
import { SuggestionsService } from 'src/app/services/suggestion.service';
import { ThemeService } from 'src/app/services/theme.service.';  

@Component({  
  selector: 'app-selected-suggestions',  
  templateUrl: './selected-suggestions.component.html',  
  styleUrls: ['./selected-suggestions.component.scss']  
})  
export class SelectedSuggestionsComponent implements OnInit {  
  suggestions: string[] = [];  

  borderColor = 'blue';  // Default color    
  private subscription!: Subscription; 
  hasSuggestions = false;
  
  constructor(private themeService: ThemeService, private suggestionsService: SuggestionsService) { }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe(theme => {      
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';      
    });  


    this.suggestionsService.selectedSuggestion$.subscribe(suggestion => {  
      this.suggestions.push(suggestion);  
      this.hasSuggestions = true;
    });  
  }  
  
  removeSuggestion(index: number) {    
    this.suggestions.splice(index, 1);  
    this.suggestionsService.removeSuggestion(index);  
  }  
  
}  
