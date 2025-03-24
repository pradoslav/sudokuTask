import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board, BoardResponse, Difficulty, SolveResponse, ValidateResponse } from './models/interfaces';

@Injectable({
  providedIn: 'root'
})

export class SugokuService {
  baseURL: string =  'https://sugoku.onrender.com/';
  constructor(private http: HttpClient) { }

  private loadingSubject = 
  new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

  getBoard(difficulty: Difficulty): Observable<BoardResponse> {
    return this.http.get<BoardResponse>(this.baseURL + 'board?difficulty=' + difficulty);
  }
  validateBoard(board: Board): Observable<ValidateResponse>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers };
    return this.http.post<ValidateResponse>(this.baseURL + 'validate',this.encodeParams({board: board}) , options)
  }
  solveBoard(board: Board): Observable<SolveResponse> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'});
    let options = { headers: headers };
    return this.http.post<SolveResponse>(this.baseURL + 'solve', this.encodeParams({board: board}), options)
  }

  encodeBoard(board: number[]){
    return board.reduce((result, row, i) => {
      return result + `%5B${encodeURIComponent((row))}%5D${i === board.length -1 ? '' : '%2C'}`}, '')
  }

  encodeParams(params: any){
    return Object.keys(params).map(key => key + '=' + `%5B${this.encodeBoard(params[key])}%5D`).join('&');
  }
}
