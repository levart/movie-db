import {Component, HostListener, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Movie} from "../../core/interfaces";
import {ImagePipe} from "../../core/pipes";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, ImagePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: Movie.Movie = {} as Movie.Movie;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('click', event);
    this.router.navigate(['/movie', this.movie.id]);
  }

  constructor(
    private router: Router
  ) {
  }
}
