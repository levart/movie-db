import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {withInterceptorsFromDi, provideHttpClient, HTTP_INTERCEPTORS, withInterceptors} from '@angular/common/http';
import {AppRoutingModule} from './app/app-routing.module';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {ApiKeyInterceptor} from "./app/core/interceptors";
import {ImagePipe} from "./app/core/pipes";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideHttpClient(withInterceptors([ApiKeyInterceptor])),
  ]
})
  .catch(err => console.error(err));
