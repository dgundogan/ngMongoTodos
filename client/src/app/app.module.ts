import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule,MdSelectModule} from '@angular/material';

import { TodoService } from './services/todo.service';

import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, HttpModule,
    MdButtonModule, MdCheckboxModule, MdSelectModule,
  ],
  providers: [ TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
