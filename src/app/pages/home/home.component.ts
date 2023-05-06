import {Component, OnInit} from '@angular/core';
import {SliderComponent} from "../../components/slider/slider.component";
import {TmdbService} from "../../core/services";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ListCardComponent} from "../../components/list-card/list-card.component";
import {MovieCardComponent} from "../../components/movie-card/movie-card.component";
import {Movie} from "../../core/interfaces";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    AsyncPipe,
    ListCardComponent,
    MovieCardComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies$: Observable<Movie.Popular | null>  = this.tmdbService.getPopularMovies({
    page: 1,
    language: 'en-US'
  }).pipe(
    map((res) => {
      if (res.results && res.results.length) {
        return res.results[0];
      }
      return null;
    })
  );

  trendingMovies$: Observable<Movie.Movie[]>  = this.tmdbService.getTrendingMovies({
    mediaType: 'movie',
    timeWindow: 'week'
  }).pipe(
    map((res) => {
      return res.results;
    })
  );

  constructor(
    private tmdbService: TmdbService
  ) {
  }

  ngOnInit(): void {
  }

}
