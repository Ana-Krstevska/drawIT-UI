import { Injectable } from '@angular/core';  
import { BehaviorSubject } from 'rxjs';  
  
@Injectable({  
  providedIn: 'root'  
})  
export class ThemeService {   
  private _theme = new BehaviorSubject<'azure' | 'aws'>('azure');  
  
  readonly theme$ = this._theme.asObservable();  
  
  selectTheme(theme: 'azure' | 'aws') {  
    this._theme.next(theme);  
  }  
}  
