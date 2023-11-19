import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { TableComponent } from './components/table/table.component';
import { HandComponent } from './components/hand/hand.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoaderInterceptor} from './intercaptors/loader.interceptor';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TableComponent,
    HandComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
