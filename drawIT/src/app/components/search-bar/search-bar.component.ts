import { Component, OnInit } from '@angular/core';  
import { ThemeService } from 'src/app/services/theme.service.';  
import { Subscription } from 'rxjs';   
import { SuggestionsService } from 'src/app/services/suggestion.service';
  
@Component({  
  selector: 'app-search-bar',  
  templateUrl: './search-bar.component.html',  
  styleUrls: ['./search-bar.component.scss']  
})  
export class SearchBarComponent implements OnInit {  
  borderColor = 'blue';  // Default color    
  private subscription!: Subscription;   
  
  selectedSuggestions: string[] = [];   
  isActive = false;  
  searchText = '';  
  suggestions = [    
    "Azure Storage Account",    
    "Azure Service Bus",    
    "Azure Function App",    
    "Azure CosmosDB",    
    "Azure Container App",    
    "Azure Monitor"    
  ];  
  filteredSuggestions: string[] = [];  
    
  constructor(private themeService: ThemeService, private suggestionsService: SuggestionsService) { }    
    
  ngOnInit() {    
    this.subscription = this.themeService.theme$.subscribe(theme => {      
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';      
    });  
    
    this.suggestionsService.removeSuggestionIndex$.subscribe(index => {  
      this.selectedSuggestions.splice(index, 1);  
    });    
  }    
  
  onSuggestionSelected(suggestion: string) {  
    this.suggestionsService.selectSuggestion(suggestion);  
  }  
  search() {  
    if(this.searchText == '') {  
      this.filteredSuggestions = [];  
      this.isActive = false;  
    } else {  
      let allSuggestions = this.suggestions.filter(suggestion =>   
        suggestion.toLowerCase().includes(this.searchText.toLowerCase())  
      );  
      this.filteredSuggestions = allSuggestions.slice(0, 3);  
      this.isActive = this.filteredSuggestions.length > 0;  
    }  
  }  
  
  handleKeyup(event: KeyboardEvent) {  
    if (event.key === 'Enter' && this.filteredSuggestions.length > 0) {  
      this.selectSuggestion(this.filteredSuggestions[0]);  
    }  
  }  
    

  selectSuggestion(suggestion: string) {      
    this.searchText = '';      
    this.onSuggestionSelected(suggestion); 
    this.filteredSuggestions = [];      
    this.isActive = false;      
  }  
  
  
  removeSuggestion(index: number) {    
    this.selectedSuggestions.splice(index, 1);  
  }   
  
  
  ngOnDestroy() {    
    this.subscription.unsubscribe();    
  }   
}  
