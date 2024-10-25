import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
  private descriptions: { [key: string]: string } = {};  

  clearDescription(theme: string): void {
    this.descriptions[theme] = '';
  }
}
