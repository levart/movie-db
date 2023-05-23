import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {ApiResponse, Movie} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TmdbService extends BaseService{


  getPopularMovies(params: {
    page?: number
    language?: string
  }): Observable<ApiResponse<Movie.Popular>> {
    return this.get<ApiResponse<Movie.Popular>>('movie/popular', params);
  }

  getTrendingMovies(params: {
    mediaType?: 'all' | 'movie' | 'tv' | 'person'
    timeWindow?: 'day' | 'week'
  }): Observable<ApiResponse<Movie.Movie>> {
    return this.get<ApiResponse<Movie.Movie>>(`trending/${params.mediaType}/${params.timeWindow}`);
  }

  searchMovies(params: {
    page?: number
    language?: string
    with_genres?: string
    region?: string
    include_adult?: boolean
    year?: number
    primary_release_year?: number
  }): Observable<ApiResponse<Movie.Movie>> {
    return this.get<ApiResponse<Movie.Movie>>(`/discover/movie`, params);
  }
  getGenres(params: {
    language?: string
  } = {
    language: 'en-US'
  }): Observable<any> {
    return this.get<any>(`/genre/movie/list`, params);
  }


  getMovieDetails(params: {
    id: number
  }): Observable<any> {
    return this.get<any>(`/movie/${params.id}`);
  }

  getMovieVideos(params: {
    id: number
  }): Observable<any> {
    return this.get<any>(`/movie/${params.id}/videos`);
  }

  getMovieCast(param: { id: any }) {
    return this.get<any>(`/movie/${param.id}/credits`);
  }

  getMovieSimilar(param: { id: any }) {
    return this.get<any>(`/movie/${param.id}/similar`);
  }
}
