import { Injectable } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class ThemeService {  
  // The current theme. By default, 'azure' is selected.  
  private _theme = new BehaviorSubject<'azure' | 'aws'>('azure');  
  
  // Observable that components can subscribe to for updates on the theme.  
  readonly theme$ = this._theme.asObservable();  
  
  selectTheme(theme: 'azure' | 'aws') {  
    this._theme.next(theme);  
  }  
}  
