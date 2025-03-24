import { Component } from '@angular/core';
import { SugokuService } from './sugoku.service';
import { Board, Difficulty, SolveResponse, ValidateResponse } from './models/interfaces';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  imports: [LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sudoku';

  board: Board = [];
  seed: Board = [];

  constructor(private sugokuService: SugokuService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.newGame('random');
  }

  newGame(difficulty: Difficulty): void {
    this.sugokuService.loadingOn();
    this.sugokuService.getBoard(difficulty).subscribe((data)=> {
      this.seed = data.board;
      this.board = JSON.parse(JSON.stringify(data.board));
      this.sugokuService.loadingOff();
      this.toastr.success('New game on ' + difficulty + ' difficulty started!');
    });
  }

  validate(): void {
    this.sugokuService.validateBoard(this.board).subscribe((data: ValidateResponse)=> {
      if(data.status === 'solved'){
      this.toastr.success('Congratulations you this is correct!');
      } else {
      this.toastr.error('Oh no, you have made a mistake! Try again?');
      }

    });
  }
  solve(): void {
    this.sugokuService.solveBoard(this.board).subscribe((data: SolveResponse)=> {
      console.log(data.status)
      if(data.status === 'solved'){
        this.seed = data.solution;
        this.board = JSON.parse(JSON.stringify(data.solution));
        this.toastr.success('Sudoku solved successfully!');
      } else {
        this.toastr.error('Oh dear, this is ' + data.status + ', maybe start a new game?');
      }

    });
  }

  change(event: Event, rowIndex: number, columndIndex: number): void {
    const inputEvent = event as InputEvent;
    const inputNumber = parseInt(inputEvent.data || '0', 10);
    let newValue = '';
    if(inputNumber !== 0 && (inputNumber > 0 && inputNumber < 10)) {
      newValue = inputNumber.toString();
      this.board[rowIndex][columndIndex] = inputNumber;
    }
    let target = event.target as HTMLInputElement;
    target.value = newValue;
  }

}
