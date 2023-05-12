import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Movie} from "../../core/interfaces";
import {ImagePipe} from "../../core/pipes";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, ImagePipe],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: Movie.Movie = {} as Movie.Movie;
}
