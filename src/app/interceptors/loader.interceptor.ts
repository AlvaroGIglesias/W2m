import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private loadingSrv: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingSrv.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        tap(() => {
          setTimeout(() => {
            this.loadingSrv.setLoading(false, request.url);
          }, 3000);
          
        })
      );
  }
}
