import { Component, OnInit } from '@angular/core';  
import { Subscription } from 'rxjs';
import { SelectedServicesService } from 'src/app/services/selected-services.service';
import { SuggestionsService } from 'src/app/services/suggestion.service';
import { ThemeService } from 'src/app/services/theme.service';  

@Component({  
  selector: 'app-selected-suggestions',  
  templateUrl: './selected-suggestions.component.html',  
  styleUrls: ['./selected-suggestions.component.scss']  
})  
export class SelectedSuggestionsComponent implements OnInit {  
  suggestions: string[] = [];  

  borderColor = 'blue';    
  theme = '';
  private subscription!: Subscription; 
  hasSuggestions = false;
  
  constructor(private themeService: ThemeService,
              private suggestionsService: SuggestionsService,
              private selectedCloudServices: SelectedServicesService) { }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe((theme: string) => {  
      this.theme = theme;    
      this.borderColor = theme === 'azure' ? '#185ee0' : '#e18f03';  
      document.documentElement.style.setProperty('--text-color',  theme === 'azure' ? '#dee9fc' : '#fcf4e8');
    
      this.suggestions = [];  
      this.hasSuggestions = false;  
          
      const previousSuggestions = this.selectedCloudServices.getSuggestions(theme);  
      if (previousSuggestions.length) {  
        this.suggestions = previousSuggestions;  
        this.hasSuggestions = true;  
      }  

    });  

  this.suggestionsService.selectedSuggestion$.subscribe((suggestion: string) => {    
    this.suggestions.push(suggestion);
    this.hasSuggestions = true;  
    });  
  }  
  
  removeSuggestion(index: number) {    
    this.suggestions.splice(index, 1);  
    this.suggestionsService.removeSuggestion(index);  
    this.selectedCloudServices.setSelectedSuggestions(this.suggestions);
  }  
  
}  
