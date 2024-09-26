import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DiagramService } from 'src/app/services/diagram.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-button-download',
  templateUrl: './button-download.component.html',
  styleUrls: ['./button-download.component.scss']
})
export class ButtonDownloadComponent implements OnInit {
  borderColor = 'blue'; 
  private subscription!: Subscription;  
  
  constructor(private themeService: ThemeService,
              private router: Router,
              private diagramService: DiagramService) { }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe(theme => {  
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';  
      document.documentElement.style.setProperty('--theme-color', theme === 'azure' ? 'rgb(15, 33, 235)' : 'rgb(247, 145, 4)');  
    });  
  }  

  goToNewPage(event: Event) {  
    event.preventDefault();  
    this.router.navigate(['/input']);  
  }    

  downloadDiagram(): void {  
    this.diagramService.downloadDiagram();  
  } 
  
  ngOnDestroy() {  
    this.subscription.unsubscribe();  
  } 

}
