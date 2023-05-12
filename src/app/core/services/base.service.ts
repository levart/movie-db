import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class BaseService {
  http: HttpClient = inject(HttpClient);
  apiUrl: string  = environment.apiUrl;

  get<T>(path: string, params = {}): Observable<T> {
    return this.http.get<T>(this.apiUrl +path, {
      params: params
    });
  }

  post<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(this.apiUrl +path, data);
  }

  put<T>(path: string, data: any): Observable<T> {
    return this.http.put<T>(this.apiUrl +path, data);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.apiUrl +path);
  }


}
