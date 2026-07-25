import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, NgxTypedJsModule],
  providers: [provideBrowserGlobalErrorListeners(), { provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [App],
})
export class AppModule {}
