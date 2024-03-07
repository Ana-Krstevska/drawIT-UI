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

  activeSuggestionIndex = -1;
  activeSuggestion: string | null = null;
  isKeyboardNavigation = false;
  isKeyPressed = false;  
  isMouseMoving = false;
  mouseOverIndex = -1;

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
    if (this.searchText == '') {
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
    this.isKeyboardNavigation = true;
    this.isKeyPressed = true;
    this.mouseOverIndex = -1;

    // ArrowDown key  
    if (event.key === 'ArrowDown') {
      if (this.activeSuggestionIndex < this.filteredSuggestions.length - 1) {  
        this.activeSuggestionIndex++;
      } else { 
        this.activeSuggestionIndex = 0; 
      }
      this.activeSuggestion = this.filteredSuggestions[this.activeSuggestionIndex];
    }
    // ArrowUp key  
    else if (event.key === 'ArrowUp') {
      if (this.activeSuggestionIndex > 0) {
        this.activeSuggestionIndex--;
      } else {
        this.activeSuggestionIndex = this.filteredSuggestions.length - 1;
      }
      this.activeSuggestion = this.filteredSuggestions[this.activeSuggestionIndex];
    }
    // Enter key  
    else if (event.key === 'Enter') {
      if (this.activeSuggestion) {
        this.selectSuggestion(this.activeSuggestion);
      }
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
