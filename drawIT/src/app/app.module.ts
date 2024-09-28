import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';  
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DescriptionAreaComponent } from './components/description-area/description-area.component';
import { ButtonGenerateComponent } from './components/button-generate/button-generate.component';
import { SelectedSuggestionsComponent } from './components/selected-suggestions/selected-suggestions.component';
import { DiagramPageComponent } from './diagram-page/diagram-page.component';
import { InputPageComponent } from './input-page/input-page.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { ButtonDownloadComponent } from './components/button-download/button-download.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { DrawingSpinnerComponent } from './components/drawing-spinner/drawing-spinner.component';

const routes: Routes = [  
  { path: '', redirectTo: '/input', pathMatch: 'full' },  
  { path: 'input', component: InputPageComponent },
  { path: 'diagram', component: DiagramPageComponent, pathMatch: 'full' }  
];  

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    SearchBarComponent,
    DescriptionAreaComponent,
    ButtonGenerateComponent,
    SelectedSuggestionsComponent,
    DiagramPageComponent,
    InputPageComponent,
    ButtonBackComponent,
    ButtonDownloadComponent,
    CanvasComponent,
    DrawingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
