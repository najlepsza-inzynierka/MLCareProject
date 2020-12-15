import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {AdminAuthService} from './services/admin-auth.service';
import {AuthService} from './services/auth.service';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authReq;
  constructor(private adminAuth: AdminAuthService, private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authAdminToken = this.adminAuth.getAuthorizationToken();
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and set the new header in one step.
    if (isNotNullOrUndefined(authAdminToken)){
      this.authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authAdminToken } });
    }
    else if (isNotNullOrUndefined(authToken)){
      this.authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
    }
    else{
      this.authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
    }

    // send cloned request with header to the next handler.
    return next.handle(this.authReq);
  }
}
