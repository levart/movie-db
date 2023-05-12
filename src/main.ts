import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AppRoutingModule} from './app/app-routing.module';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {ApiKeyInterceptor} from "./app/core/interceptors";
import {register} from 'swiper/element/bundle';
import {NgxPaginationModule} from "ngx-pagination";

register();

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, NgxPaginationModule),
    provideHttpClient(withInterceptors([ApiKeyInterceptor])),
  ],
})
  .catch(err => console.error(err));
