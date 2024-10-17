import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingRequest } from 'src/app/models/drawing-request.model';
import { DrawingAPIService } from 'src/app/services/drawing-api.service';
import { SuggestionsService } from 'src/app/services/suggestion.service';

@Component({
  selector: 'app-notification-suggestion',
  templateUrl: './notification-suggestion.component.html',
  styleUrls: ['./notification-suggestion.component.scss']
})
export class NotificationSuggestionComponent implements OnInit {
  suggestion: any; 
  suggestionId: any;
  isLoading = false; 

  constructor(private suggestionsService: SuggestionsService,
              private apiService: DrawingAPIService,
              private router: Router,
  ) { } 

  ngOnInit(): void {  
    this.suggestionsService.currentSuggestion.subscribe(suggestion => {  
      this.suggestion = suggestion;  

      if(this.suggestion !== null)
        this.suggestionId = suggestion.id; 
    });
  } 
  
  generateSuggestion(): void {
    this.apiService.getDrawingRequestFromSuggestion(this.suggestionId).subscribe((response: DrawingRequest) => {        
        this.router.navigate(['/diagram']);   
        this.closeNotification();
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
