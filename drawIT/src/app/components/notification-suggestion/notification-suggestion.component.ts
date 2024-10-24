import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingRequest } from 'src/app/models/drawing-request.model';
import { DescriptionService } from 'src/app/services/description.service';
import { DiagramService } from 'src/app/services/diagram.service';
import { DrawingAPIService } from 'src/app/services/drawing-api.service';
import { SelectedServicesService } from 'src/app/services/selected-services.service';
import { SuggestionsService } from 'src/app/services/suggestion.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-notification-suggestion',
  templateUrl: './notification-suggestion.component.html',
  styleUrls: ['./notification-suggestion.component.scss']
})
export class NotificationSuggestionComponent implements OnInit {
  suggestionBackground?: string;
  iconColor?: string;
  suggestion: any; 
  suggestionId: any;
  theme = 'azure';
  isLoading = false; 

  constructor(private suggestionsService: SuggestionsService,
              private selectedServices: SelectedServicesService,
              private descriptionService: DescriptionService,
              private apiService: DrawingAPIService,
              private themeService: ThemeService,
              private router: Router,
  ) { } 

  ngOnInit(): void {  
    this.suggestionsService.currentSuggestion.subscribe(suggestion => {  
      this.suggestion = suggestion;  

      if(this.suggestion !== null)
      {
        this.themeService.theme$.subscribe(theme => {

          if (theme === 'azure') {
            this.suggestionBackground = '#a9c6fb';
            this.iconColor = '#4284ff';
          } else {
            this.suggestionBackground = '#f3dbb3';
            this.iconColor = '#e48c05';
          }
          this.theme = theme;
          document.documentElement.style.setProperty('--suggestion-background', this.suggestionBackground);
          document.documentElement.style.setProperty('--icon-color', this.iconColor);
        });
        this.suggestionId = suggestion.id; 
      }
    });
  } 
  
  generateSuggestion(): void {
    this.apiService.getDrawingRequestFromSuggestion(this.suggestionId).subscribe((response: DrawingRequest) => {        
        this.router.navigate(['/diagram']);   
        this.closeNotification();
        this.selectedServices.clearSuggestion(this.theme);
        this.descriptionService.clearDescription(this.theme);
        this.isLoading = false; 
    }, error => {  
        this.isLoading = false; 
    }); 
  }

  closeNotification(): void {  
    this.suggestion = null;  
    this.suggestionsService.changeArchitectureSuggestion(null);  
  }  

}
