import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { BoardComponent } from './board/board/board.component';

import { CookieService } from 'ngx-cookie-service';
import { TrapScrollDirective } from "./board/board/trap-scroll.directive";
import 'hammerjs';

@NgModule({
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  BrowserAnimationsModule,
  BoardModule,
  RouterModule.forRoot([
    {
      path: '',
      component: BoardComponent,
    },
  ]),
  ],
  declarations: [
    AppComponent,
    TrapScrollDirective
  ],
  providers: [ CookieService],
  bootstrap: [
    AppComponent,
    BoardComponent
  ]
})
export class AppModule { }
