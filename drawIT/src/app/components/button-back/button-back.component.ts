import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.scss']
})
export class ButtonBackComponent implements OnInit {
  borderColor = 'blue'; 
  private subscription!: Subscription;  
  
  constructor(private themeService: ThemeService, private router: Router) { }  
  
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
  
  ngOnDestroy() {  
    this.subscription.unsubscribe();  
  } 

}
