import { Component, OnInit } from '@angular/core';  
import { ThemeService } from 'src/app/services/themeService';  
import { Subscription } from 'rxjs';   
  
@Component({  
  selector: 'app-search-bar',  
  templateUrl: './search-bar.component.html',  
  styleUrls: ['./search-bar.component.scss']  
})  
export class SearchBarComponent implements OnInit {  
  borderColor = 'blue';  // Default color    
  private subscription!: Subscription;   
  
  selectedSuggestion: string = '';  
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
    
  constructor(private themeService: ThemeService) { }    
    
  ngOnInit() {    
    this.subscription = this.themeService.theme$.subscribe(theme => {    
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';    
    });    
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
    this.selectedSuggestion = suggestion;  
    this.filteredSuggestions = [];  
    this.isActive = false;  
  }   
  
  removeSuggestion() {  
    this.selectedSuggestion = '';  
  }  
  
  ngOnDestroy() {    
    this.subscription.unsubscribe();    
  }   
}  
