import { Component, Input, OnInit } from '@angular/core';  
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
  private subscription!: Subscription; 
  hasSuggestions = false;
  
  constructor(private themeService: ThemeService,
              private suggestionsService: SuggestionsService,
              private selectedCloudServices: SelectedServicesService) { }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe((theme: string) => {      
      this.borderColor = theme === 'azure' ? '#185ee0' : '#e18f03';  
      document.documentElement.style.setProperty('--text-color',  theme === 'azure' ? '#dee9fc' : '#fcf4e8');
    });  


    this.suggestionsService.selectedSuggestion$.subscribe((suggestion: string) => {  
      this.suggestions.push(suggestion);  
      this.selectedCloudServices.setSelectedSuggestions(this.suggestions);
      this.hasSuggestions = true;
    });  
  }  
  
  removeSuggestion(index: number) {    
    this.suggestions.splice(index, 1);  
    this.suggestionsService.removeSuggestion(index);  
    this.selectedCloudServices.setSelectedSuggestions(this.suggestions);
  }  
  
}  
