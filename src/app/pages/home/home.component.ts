import {Component, computed, OnInit, Signal} from '@angular/core';
import {SliderComponent} from "../../components/slider/slider.component";
import {TmdbService} from "../../core/services";
import {map, Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ListCardComponent} from "../../components/list-card/list-card.component";
import {MovieCardComponent} from "../../components/movie-card/movie-card.component";
import {Movie} from "../../core/interfaces";
import {Router, RouterLink} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    AsyncPipe,
    ListCardComponent,
    MovieCardComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Signal<Movie.Popular[] | undefined>  = toSignal(this.tmdbService.getPopularMovies({
    page: 1,
    language: 'en-US'
  }).pipe(
    map((res) => res.results)
  ))

  trendingMovies: Signal<Movie.Movie[] | undefined>  = toSignal(this.tmdbService.getTrendingMovies({
    mediaType: 'movie',
    timeWindow: 'week'
  }).pipe(
    map((res) => {
      return res.results;
    })
  ));

  topMovie = computed(() => {
    if (!this.popularMovies() || this.popularMovies()?.length === 0) {
      return null;
    }
    return this.popularMovies()?.slice(0, 1)[0];
  })

  constructor(
    private tmdbService: TmdbService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  searchMovies(trending: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        trending
      }
    })
  }
}
