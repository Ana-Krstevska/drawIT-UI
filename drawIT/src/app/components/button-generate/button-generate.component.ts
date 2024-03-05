import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service.';

@Component({
  selector: 'app-button-generate',
  templateUrl: './button-generate.component.html',
  styleUrls: ['./button-generate.component.scss']
})
export class ButtonGenerateComponent implements OnInit {
  borderColor = 'blue';  // Default color  
  private subscription!: Subscription;  
  
  constructor(private themeService: ThemeService) { }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe(theme => {  
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';  
      document.documentElement.style.setProperty('--theme-color', theme === 'azure' ? 'rgb(15, 33, 235)' : 'rgb(247, 145, 4)');  
    });  
  }  
  
  ngOnDestroy() {  
    this.subscription.unsubscribe();  
  } 

}
