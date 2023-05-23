import {Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, Injector, OnInit, Sanitizer, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SliderComponent} from "../../components/slider/slider.component";
import {ActivatedRoute} from "@angular/router";
import {combineLatest, filter, map, Observable, switchMap, tap} from "rxjs";
import {Movie} from "../../core/interfaces";
import {TmdbService} from "../../core/services";
import {toSignal} from "@angular/core/rxjs-interop";
import {TrailersActorsComponent} from "./trailers-actors/trailers-actors.component";
import {DomSanitizer} from "@angular/platform-browser";
import {ImagePipe} from "../../core/pipes";
import {ActorCardComponent} from "../../components/actor-card/actor-card.component";
import {ListCardComponent} from "../../components/list-card/list-card.component";

@Component({
  selector: 'app-details',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, SliderComponent, TrailersActorsComponent, ImagePipe, ActorCardComponent, ListCardComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  data = toSignal(this.route.params.pipe(
    filter((params) => params['id']),
    map((params) => params['id']),
    switchMap((id: any) => combineLatest([
      this.tmdbService.getMovieDetails({id}),
      this.tmdbService.getMovieVideos({id}),
      this.tmdbService.getMovieCast({id}),
      this.tmdbService.getMovieSimilar({id}),
    ]).pipe(
      map(([movie, trailers, credits, similar]) => ({
          movie: movie as Movie.Movie,
          trailers: trailers.results,
          actors: credits.cast as any[],
          similar: similar.results as Movie.Movie[]
        })
      )
    ))
  ));


  trailer: any = computed(() => {
    if (this.data() && this.data()?.trailers && this.data()?.trailers.length > 0) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.data()?.trailers[0].key}`);
    }
    return null;
  })

  cast: any = computed(() => {
    if (this.data() && this.data()?.actors) {
      return this.data()?.actors?.filter((actor: any) => actor.profile_path).slice(0, 20);
    }
    return [];
  })


  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer
  ) {
  }
}
