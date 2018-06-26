import { Component, OnInit, HostListener, AfterViewChecked } from '@angular/core';
import { animate, AnimationMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

export type BoardState = number[][];
export type AnimationState = Animation[][];

export type Direction = 'top' | 'right' | 'bottom' | 'left';
export type Animation = 'base' | 'moveLeft' | 'moveRight' | 'moveUp' | 'moveDown';
export const AnimationDuration = 300;

@Component({
  selector: 'fm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('tile', [
      state('base', style({
        transform: 'translateX(0) scale(1)',
      })),
      state('updated', style({ })),
      state('moveLeft',   style({ })),
      state('moveRight',   style({ })),
      transition('base => updated', [
        animate(100, keyframes([
          style({transform: 'scale(1)',   offset: 0}),
          style({transform: 'scale(1.1)', offset: 0.3}),
          style({transform: 'scale(1)',  offset: 1.0})
        ]))
      ]),
      transition('base => moveLeft', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)',   offset: 0}),
          style({transform: 'translateX(-100%)', offset: 1}),
        ]))
      ]),
      transition('base => moveRight', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)',   offset: 0}),
          style({transform: 'translateX(100%)', offset: 1}),
        ]))
      ]),
      transition('base => moveUp', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)',   offset: 0}),
          style({transform: 'translateY(-100%)', offset: 1}),
        ]))
      ]),
      transition('base => moveDown', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)',   offset: 0}),
          style({transform: 'translateY(+100%)', offset: 1}),
        ]))
      ]),
    ])
  ]
})
export class BoardComponent implements OnInit {

  @HostListener('document: keydown.ArrowUp', ['$event.target']) arrowUp() {
    this.moveUp();
  };

  @HostListener('document: keydown.ArrowRight', ['$event.target']) arrowRight() {
    this.moveRight();
  };

  @HostListener('document: keydown.ArrowDown', ['$event.target']) arrowDown() {
    this.moveDown();
  };

  @HostListener('document: keydown.ArrowLeft', ['$event.target']) arrowLeft() {
    this.moveLeft();
  };

  private size = 4;
  private baseValue = 2;

  private grid = new Array(this.size).fill(new Array(this.size).fill(null));

  //private state$ = new BehaviorSubject<BoardState>(new Array(this.size).fill(null).map(_ => new Array(this.size).fill(null)));
  private field: BoardState = new Array(this.size).fill(null).map(_ => new Array(this.size).fill(null));
  private fieldView: BoardState;

  private animations: AnimationState; // = new Array(this.size).fill(null).map(_ => new Array(this.size).fill('base'));
  private animationsView: AnimationState;

  tileWidth = 100;
  tileHeight = 100;

  constructor() { }

  ngOnInit() {
    console.log('Init state', this.field);
    this.resetAnimations();
    this.fillRandom();
    this.fillRandom();
    this.render(false);
  }

  ngAfterViewChecker() {
    console.log('ViewChecked');
  }

  fill(x: number, y: number) {
    this.field[x][y] = this.baseValue;
  }

  fillRandom() {

    let empties = [];
    this.field.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile === null){
          empties.push([rowIndex, tileIndex])
        }
      });
    });

    console.log('elems', empties);
    if (empties.length ===0 ) {
      //alert('Game Over');
    }

    let coords = empties[Math.floor(Math.random() * empties.length)];
    this.field[coords[0]][coords[1]] = this.baseValue;

    //this.state$.next(field);
  }

  moveUp() {

    // row by row from top to bottom
    for (let rowIndex = 0; rowIndex < this.size; rowIndex++){
      // left to right scan
      for (let tileIndex = 0; tileIndex < this.size; tileIndex++){
        // move to top
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = rowIndex; searchIndex > 0; searchIndex--){
            if (this.mergeTiles(this.field, searchIndex, tileIndex, 'top')) {
              if (searchIndex === tileIndex) {
                this.animations[rowIndex][tileIndex] = 'moveUp';
              }
            }
            else{
              break;
            }
          }
        }
      }
    }
    this.fillRandom();
    this.render();
  }

  moveDown() {
    // row by row from bottom to top
    for (let rowIndex = this.size - 1; rowIndex >= 0; rowIndex--){
      // from left to right scan
      for (let tileIndex = 0; tileIndex < this.size; tileIndex++){
        // move to bottom-most tile
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = rowIndex; searchIndex < this.size; searchIndex++){
            if (this.mergeTiles(this.field, searchIndex, tileIndex, 'bottom')) {
              if (searchIndex === tileIndex) {
                this.animations[rowIndex][tileIndex] = 'moveDown';
              }
            }
            else{
              break;
            }
          }
        }
      }
    }
    this.fillRandom();
    this.render();
  }

  moveRight() {
    // check row by row
    for (let rowIndex = 0; rowIndex < this.size; rowIndex++){
      // check from right to left
      for (let tileIndex = this.size - 1; tileIndex >= 0; tileIndex--){
        // check edge
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = tileIndex; searchIndex < this.size; searchIndex++){
            if (this.mergeTiles(this.field, rowIndex, searchIndex, 'right')) {
              if (searchIndex === tileIndex) {
                this.animations[rowIndex][tileIndex] = 'moveRight';
              }
            }
            else{
              break;
            }
          }
        }
      }
    }
    this.fillRandom();
    this.render();
  }

  moveLeft() {
    for (let rowIndex = 0; rowIndex < this.size; rowIndex++){
      for (let tileIndex = 0; tileIndex < this.size; tileIndex++){
        // move to left-most available tile
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = tileIndex; searchIndex > 0; searchIndex--){
            if (this.mergeTiles(this.field, rowIndex, searchIndex, 'left')) {
              if (searchIndex === tileIndex) {
                this.animations[rowIndex][tileIndex] = 'moveLeft';
              }
            }
            else{
              break;
            }
          }
        }
      }
    }
    this.fillRandom();
    this.render();
  }

  private mergeTiles(field: BoardState, rowIndex: number, tileIndex: number, direction: Direction) {
    const size = field.length;
    const tileValue = field[rowIndex][tileIndex];
    const destRowIndex = direction === 'top' ? rowIndex - 1 : direction === 'bottom' ? rowIndex + 1 : rowIndex;
    const destTileIndex = direction === 'left' ? tileIndex - 1 : direction === 'right' ? tileIndex + 1 : tileIndex;
    if (destRowIndex >= 0 && destRowIndex < size && destTileIndex >= 0 && destTileIndex < size) {
      if (field[destRowIndex][destTileIndex] === null) {
        field[destRowIndex][destTileIndex] = tileValue;
        field[rowIndex][tileIndex] = null;
        return true;
      } else if (field[destRowIndex][destTileIndex] === tileValue){
        // check value, can merge, merge.
        field[destRowIndex][destTileIndex] *= 2;
        field[rowIndex][tileIndex] = null;
        return false;
      } else{
        // cannot merge, break (eg. 2-->4 )
        return false;
      }
    }
    else {
      return false;
    }
  }

  resetAnimations() {
    this.animations = new Array(this.size).fill(null).map(_ => new Array(this.size).fill('base'));
  }

  render(animate = true) {
    if (animate){
      this.animationsView = this.clone(this.animations);
      setTimeout(() => {
        this.resetAnimations();
        this.animationsView
        this.fieldView = this.clone(this.field);
      }, AnimationDuration);
    }
    else {
    this.animationsView = this.clone(this.animations);
      this.fieldView = this.clone(this.field);
    }
  }

  clone(state){
    let copy = [];
    state.forEach(row => {
      copy.push([...row]);
    });
    return copy;
  }

}
