import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgidPaginationModule } from './ngid-pagination';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgidPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
