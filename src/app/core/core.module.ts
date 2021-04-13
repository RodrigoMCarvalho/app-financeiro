import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports:[
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule { }
