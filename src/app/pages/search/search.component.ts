import {ChangeDetectionStrategy, Component, effect, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TmdbService} from "../../core/services";
import {Movie} from "../../core/interfaces";
import {MovieCardComponent} from "../../components/movie-card/movie-card.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, map} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {NgxPaginationModule} from "ngx-pagination";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  filterForm: FormGroup = new FormGroup({
    with_genres: new FormControl(''),
    year: new FormControl(2023),
  });

  tmdbService: TmdbService = inject(TmdbService)

  movies = signal<Movie.Movie[]>([]);
  filter: any = signal<any>(this.filterForm.value);
  page = signal(1)

  genres = toSignal(this.tmdbService.getGenres().pipe(map( res => res.genres)))



  filterMoviees = effect(() => {
    console.log('filter', this.filter())
    this.getMovies()
  })


  ngOnInit() {
    this.getMovies()
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((value) => {
        this.filter.set(value)
      })


  }

  getMovies() {
    this.tmdbService.searchMovies({
      page: this.page(),
      language: 'en-US',
      ...this.filter()
    }).subscribe((res) => {
      this.movies.set(res.results)
    })
  }

  onTableDataChange($event: number) {
    console.log($event)
    this.page.update( value => value + 1)
  }
}
