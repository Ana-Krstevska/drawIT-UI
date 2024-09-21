import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawingAPIService } from 'src/app/services/drawing-api.service';
import { SelectedServicesService } from 'src/app/services/selected-services.service';
import { ThemeService } from 'src/app/services/theme.service';
import { DrawingRequest } from 'src/app/models/drawing-request.model';

@Component({
  selector: 'app-button-generate',
  templateUrl: './button-generate.component.html',
  styleUrls: ['./button-generate.component.scss']
})
export class ButtonGenerateComponent implements OnInit {
  @Input() theme!: 'azure' | 'aws';  
  selectedSuggestions!: string[];
  @Input() description!: string; 

  borderColor = 'blue'; 
  private subscription!: Subscription;  
  
  constructor(private themeService: ThemeService, 
              private router: Router,
              private apiService: DrawingAPIService,
              private selectedCloudServices: SelectedServicesService) {
                this.selectedCloudServices.selectedSuggestions$.subscribe(  
                  suggestions => this.selectedSuggestions = suggestions  
                );
               }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe(theme => {  
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';  
      document.documentElement.style.setProperty('--theme-color', theme === 'azure' ? 'rgb(15, 33, 235)' : 'rgb(247, 145, 4)');  
    });  
  }  

  goToNewPage(event: Event) {  
    event.preventDefault();  
    const request = {  
      cloud: this.theme === 'azure' ? 0 : 1,  
      cloudServices: this.selectedSuggestions,  
      userDescription: this.description  
    };  
    this.apiService.sendPrompt(request).subscribe((response: DrawingRequest) => {    
        this.router.navigate(['/diagram']);      
    }); 
  }    
  
  ngOnDestroy() {  
    this.subscription.unsubscribe();  
  } 

}
