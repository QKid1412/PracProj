import { Component, OnInit, HostListener, AfterViewChecked, Input } from '@angular/core';
import { animate, AnimationMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';

import { CookieService } from 'ngx-cookie-service';

//import { compile } from '../animations'

export type BoardState = number[][];
export type AnimationState = Animation[][];

export type Direction = 'top' | 'right' | 'bottom' | 'left';
export type Animation = string; //'base' | 'moveLeft' | 'moveRight' | 'moveUp' | 'moveDown';
export const AnimationDuration = 200;

const size = 4;

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('tile', [
      state('base', style({
        transform: 'translateX(0) scale(1)',
      })),

    /*  transition('base => appeared', [
        style({width: 10, transform: 'translateX(0)', opacity: 0}),
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)', width: 100
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
      ]),*/

      transition('base => updated', [
        animate(AnimationDuration, keyframes([
          style({transform: 'scale(1)', zIndex: 1,  offset: 0}),
          style({transform: 'scale(1.1)', zIndex: 1,  offset: 0.3}),
          style({transform: 'scale(1)',  zIndex: 1,  offset: 1.0})
        ]))
      ]),

      transition('base => moveLeft-1', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(-100%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(-100%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(-100%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),
      transition('base => moveLeft-2', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(-200%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(-200%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(-200%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),
      transition('base => moveLeft-3', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(-300%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(-300%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(-300%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),
      transition('base => moveLeft-4', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(-400%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(-400%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(-400%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),


      transition('base => moveRight-1', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(100%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(100%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(100%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),
      transition('base => moveRight-2', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(200%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(200%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(200%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),
      transition('base => moveRight-3', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(300%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(300%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(300%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),
      transition('base => moveRight-4', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateX(0)', zIndex: 1,  offset: 0}),
          style({transform: 'translateX(400%)', zIndex: 1,  offset: 0.5}),
          style({transform: 'translateX(400%) scale(1.1)', zIndex: 1,  offset: 0.75}),
          style({transform: 'translateX(400%) scale(1)', zIndex: 1,  offset: 1}),
        ]))
      ]),


      transition('base => moveUp-1', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(-100%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(-100%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(-100%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),
      transition('base => moveUp-2', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(-200%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(-200%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(-200%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),
      transition('base => moveUp-3', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(-300%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(-300%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(-300%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),
      transition('base => moveUp-4', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(-400%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(-400%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(-400%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),


      transition('base => moveDown-1', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(100%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(100%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(100%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),
      transition('base => moveDown-2', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(200%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(200%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(200%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),
      transition('base => moveDown-3', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(300%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(300%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(300%) scale(1)', zIndex: 1, offset: 1}),
        ]))
      ]),
      transition('base => moveDown-4', [
        animate(AnimationDuration, keyframes([
          style({transform: 'translateY(0)', zIndex: 1, offset: 0}),
          style({transform: 'translateY(400%)', zIndex: 1, offset: 0.5}),
          style({transform: 'translateY(400%) scale(1.1)', zIndex: 1, offset: 0.75}),
          style({transform: 'translateY(400%) scale(1)', zIndex: 1, offset: 1}),
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

  private baseValue = 2;

  grid = new Array(size).fill(new Array(size).fill(null));
  private checkIfMergedStatus: boolean[][];

  //private state$ = new BehaviorSubject<BoardState>(new Array(size).fill(null).map(_ => new Array(size).fill(null)));
  private field: BoardState = new Array(size).fill(null).map(_ => new Array(size).fill(null));
  fieldView: BoardState;

  private animations: AnimationState; // = new Array(size).fill(null).map(_ => new Array(size).fill('base'));
  private animationsView: AnimationState;

  tileWidth = 100;
  tileHeight = 100;

  currentScore;
  highestScore;

  constructor( private cookieService: CookieService ) { }

  ngOnInit() {

    console.log('Init state', this.field);
    this.resetAnimations();
    this.fillRandom();
    this.fillRandom();
    this.render(false);
    this.resetCurrentScore();
    this.retrieveHighestScore();
    console.log('Highest Score', this.highestScore);
  }

  ngAfterViewChecker() {
    console.log('ViewChecked');
  }

  fill(x: number, y: number) {
    this.field[x][y] = this.baseValue;
  }

  fillRandom() {

    let empties = [];
    let max = this.baseValue;
    this.field.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        if (tile === null){
          empties.push([rowIndex, tileIndex])
        } else if (tile > max) {
          max = tile;
        }
      });
    });

    console.log('elems', empties);
    if (empties.length ===0 ) {
      //alert('Game Over');
    }

    let value = this.baseValue;
    let stack = [];
    stack.push(2);
    if (max >= 16) {
      stack.push(4);
    }
    if (max >= 128) {
      stack.push(8);
    }
    if (max >= 512) {
      stack.push(16);
    }

    value = stack[Math.floor(Math.random() * stack.length)];

    let coords = empties[Math.floor(Math.random() * empties.length)];
    this.field[coords[0]][coords[1]] = value;
    //this.animations[coords[0]][coords[1]] = 'appeared' ;

    //this.state$.next(field);
  }


  moveUp() {
    this.resetMergeStatus();
    let moved = false;
    // row by row from top to bottom
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      // left to right scan
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        // move to top
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = rowIndex; searchIndex >= 0; searchIndex--){
            let mergeResult = this.mergeTiles(this.field, searchIndex, tileIndex, 'top');
            if (mergeResult !== false) {
              const diff = mergeResult === true ? rowIndex - searchIndex + 1 : rowIndex - searchIndex;
              if(diff !== 0){
                  this.animations[rowIndex][tileIndex] = 'moveUp-' + diff  ;
                  moved = true;
              }
            }
            if (mergeResult === null || mergeResult === true){
              break;
            }
          }
        }
      }
    }
    if (moved){
      this.fillRandom();
      this.render();
    }
  }

  moveDown() {
    this.resetMergeStatus();
    let moved = false;
    // row by row from bottom to top
    for (let rowIndex = size - 1; rowIndex >= 0; rowIndex--){
      // from left to right scan
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        // move to bottom-most tile
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = rowIndex; searchIndex < size; searchIndex++){
            let mergeResult = this.mergeTiles(this.field, searchIndex, tileIndex, 'bottom');
            if (mergeResult !== false) {
              const diff = mergeResult === true ? searchIndex - rowIndex + 1 : searchIndex - rowIndex;
              if(diff !== 0){
                  this.animations[rowIndex][tileIndex] = 'moveDown-' + diff  ;
                  moved = true;
              }
            }
            if (mergeResult === null || mergeResult === true){
              break;
            }
          }
        }
      }
    }
    if (moved){
      this.fillRandom();
      this.render();
    }
  }


  moveRight() {
    this.resetMergeStatus();
    // check row by row
    let moved = false;
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      // check from right to left
      for (let tileIndex = size - 1; tileIndex >= 0; tileIndex--){
        // check edge
        if (this.field[rowIndex][tileIndex] !== null ){
          let searchIndex;
          for (searchIndex = tileIndex; searchIndex < size; searchIndex++) {
            let mergeResult = this.mergeTiles(this.field, rowIndex, searchIndex, 'right');
            if (mergeResult !== false) {
              const diff = mergeResult === true ? searchIndex - tileIndex + 1 : searchIndex - tileIndex;
              if(diff !== 0){
                  this.animations[rowIndex][tileIndex] = 'moveRight-' + diff  ;
                  moved = true;
              }
            }
            if (mergeResult === null || mergeResult === true){
              break;
            }
          }
        }
      }
    }
    if (moved){
      this.fillRandom();
      this.render();
    }
  }

  moveLeft() {
    this.resetMergeStatus();
    let moved = false;
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        // move to left-most available tile
        if (this.field[rowIndex][tileIndex] !== null ){
          for (let searchIndex = tileIndex; searchIndex >= 0; searchIndex--){
            let mergeResult = this.mergeTiles(this.field, rowIndex, searchIndex, 'left');
            if (mergeResult !== false) {
              const diff = mergeResult === true ? tileIndex - searchIndex + 1 : tileIndex - searchIndex;
              if(diff !== 0){
                  this.animations[rowIndex][tileIndex] = 'moveLeft-' + diff  ;
                  moved = true;
              }
            }
            if (mergeResult === null || mergeResult === true){
              break;
            }
          }
        }
      }
    }
    if (moved){
      this.fillRandom();
      this.render();
    }
  }

  /*isGameOver(){
    boolean result = true;
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        if (this.field[rowIndex][tileIndex] === this.field[rowIndex-1][tileIndex] || this.field[rowIndex][tileIndex] === this.field[rowIndex+1][tileIndex] || this.field[rowIndex][tileIndex] === this.field[rowIndex][tileIndex-1] || this.field[rowIndex][tileIndex] === this.field[rowIndex][tileIndex+1] ) {
          result = false;
        }
      }
    }
    return result;
  }*/


  newGame() {
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        this.field[rowIndex][tileIndex] = null;
      }
    }
    this.resetAnimations();
    this.fillRandom();
    this.fillRandom();
    this.render(false);
    this.resetCurrentScore();
  }

  bombAttack() {
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        if (this.field[rowIndex][tileIndex] !== null && this.field[rowIndex][tileIndex] === 2){
            this.field[rowIndex][tileIndex] = null;
        }
      }
    }

    let empty = true;
    for (let rowIndex = 0; rowIndex < size; rowIndex++){
      for (let tileIndex = 0; tileIndex < size; tileIndex++){
        if (this.field[rowIndex][tileIndex] !== null){
            empty = false;
        }
      }
    }

    if (empty){
      this.fillRandom();
      this.fillRandom();
    }
    this.resetAnimations();
    this.render(false);
  }

  private mergeTiles(field: BoardState, rowIndex: number, tileIndex: number, direction: Direction) {
    const size = field.length;
    const tileValue = field[rowIndex][tileIndex];
    const destRowIndex = direction === 'top' ? rowIndex - 1 : direction === 'bottom' ? rowIndex + 1 : rowIndex;
    const destTileIndex = direction === 'left' ? tileIndex - 1 : direction === 'right' ? tileIndex + 1 : tileIndex;
    if (destRowIndex >= 0 && destRowIndex < size && destTileIndex >= 0 && destTileIndex < size) {
      if (this.checkIfMergedStatus[destRowIndex][destTileIndex]) {
        return null;
      } else {
          if (field[destRowIndex][destTileIndex] === null) {
            field[destRowIndex][destTileIndex] = tileValue;
            field[rowIndex][tileIndex] = null;
            return false;
          } else if (field[destRowIndex][destTileIndex] === tileValue){
            // check value, can merge, merge.
            field[destRowIndex][destTileIndex] *= 2;

            this.currentScore += field[destRowIndex][destTileIndex];
            if (this.currentScore >= this.highestScore){
                  this.highestScore = this.currentScore;
            }

            this.cookieService.set( 'HighestScore', JSON.stringify(this.highestScore));

            field[rowIndex][tileIndex] = null;
            this.checkIfMergedStatus[destRowIndex][destTileIndex] = true;
            return true;
          } else{
            // cannot merge, break (eg. 2-->4 )
            return null;
          }
        }
      }
    else {
      return null;
    }
  }

  private resetMergeStatus() {
    this.checkIfMergedStatus = new Array(size).fill(false).map(_ => new Array(size).fill(false));
  }

  resetAnimations() {
    this.animations = new Array(size).fill(null).map(_ => new Array(size).fill('base'));
  }

  resetCurrentScore() {
    this.currentScore = 0;
  }

  retrieveHighestScore() {
    if (this.highestScore === null){
      this.highestScore = 0;
    }
    else {
      this.highestScore = Number(this.cookieService.get('HighestScore'));
    }
  }

  render(animate = true) {
    if (animate){
      this.animationsView = this.clone(this.animations);
      setTimeout(() => {
        this.resetAnimations();
        this.animationsView = this.clone(this.animations);
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
