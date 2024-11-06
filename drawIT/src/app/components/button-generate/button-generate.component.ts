import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawingAPIService } from 'src/app/services/drawing-api.service';
import { SelectedServicesService } from 'src/app/services/selected-services.service';
import { ThemeService } from 'src/app/services/theme.service';
import { DrawingRequest } from 'src/app/models/drawing-request.model';
import { DescriptionService } from 'src/app/services/description.service';

@Component({
  selector: 'app-button-generate',
  templateUrl: './button-generate.component.html',
  styleUrls: ['./button-generate.component.scss']
})
export class ButtonGenerateComponent implements OnInit {
  @Input() theme!: 'azure' | 'aws';  
  selectedSuggestions!: string[];
  @Input() description!: string; 
  @Output() pencilColorChange = new EventEmitter<string>();

  borderColor = 'blue'; 
  isLoading = false; 
  private subscription!: Subscription;  
  private drawingRequest!: DrawingRequest;

  constructor(private themeService: ThemeService, 
              private router: Router,
              private apiService: DrawingAPIService,
              private descriptionService: DescriptionService,
              private selectedCloudServices: SelectedServicesService) {
                this.selectedCloudServices.selectedSuggestions$.subscribe(  
                  suggestions => this.selectedSuggestions = suggestions  
                );
               }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe(theme => {  
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';  
      document.documentElement.style.setProperty('--theme-color', theme === 'azure' ? 'rgb(15, 33, 235)' : 'rgb(247, 145, 4)');  ;
    });  
  }  

  goToNewPage(event: Event) {      
    event.preventDefault();      
    const cloud = this.theme === 'azure' ? 0 : 1;    
    this.isLoading = true;
    this.apiService.sendPrompt(cloud, this.selectedSuggestions, this.description).subscribe((response: DrawingRequest) => {        
        this.router.navigate(['/diagram']); 
        this.descriptionService.clearDescription(this.theme);
        this.isLoading = false; 
    }, error => {  
        this.isLoading = false; 
    }); 
  }     
  
  ngOnDestroy() {  
    this.subscription.unsubscribe();  
  } 

}
