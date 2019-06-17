/*    Só funciona no angular mais recente - buá buá

import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/http';


{ provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }

@Injectable
export class I1 implements HttpInterceptor{
    intercept(req: HttRequest<any>, next: HttpHandler<HttpEvent<any>>){
        const modified = req.clone({
            setHeaders: {
                'Custom-Header-1': '1'}
            });
        return next.handle(modified);
    }
}

@Injectable
export class I1 implements HttpInterceptor{
    intercept(req: HttRequest<any>, next: HttpHandler<HttpEvent<any>>){
        const modified = req.clone({
            setHeaders: {
                'Custom-Header-1': '1'}
            });
        return next.handle(modified);
    }
}

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/upload/file') === -1) {
      return next.handle(req); // do nothing
    }
    const delay = 300;
    // Create simulation of upload event stream
    return createUploadEvents(delay);
  }
}

*/