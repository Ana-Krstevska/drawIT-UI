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
  
  constructor(private themeService: ThemeService) { }  
  
  ngOnInit() {  
    this.subscription = this.themeService.theme$.subscribe(theme => {  
      this.borderColor = theme === 'azure' ? 'blue' : 'orange';  
    });  
  }  
  
  ngOnDestroy() {  
    this.subscription.unsubscribe();  
  } 

}
