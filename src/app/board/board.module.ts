import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';

const COMPONENTS = [
  BoardComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: COMPONENTS,
  declarations: COMPONENTS,
  providers: []
})
export class BoardModule {
}
