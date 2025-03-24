import { AsyncPipe } from '@angular/common';
import { Component} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SugokuService } from '../sugoku.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
  imports: [AsyncPipe],
  standalone: true,
})
export class LoadingIndicatorComponent {

  loading$: Observable<boolean>;
  constructor(
  private sugokuService: SugokuService) {
    this.loading$ = this.sugokuService.loading$;
  }
}
