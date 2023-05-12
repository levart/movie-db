import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHandlerFn
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";

// @Injectable()
// export class ApiKeyInterceptor implements HttpInterceptor {
//   apiKey: string = environment.apiKey
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     console.log(this.apiKey)
//     return next.handle(request.clone(
//       {
//         setParams: {
//           api_key: this.apiKey
//         }
//       }
//     ));
//   }
// }


export function ApiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const apiKey: string = environment.apiKey
  return next(req.clone(
    {
      setParams: {
        api_key: apiKey
      }
    }
  ));
}
