import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AdminAuthService} from './services/admin-auth.service';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authReq;
  constructor(private adminAuth: AdminAuthService, private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authAdminToken = this.adminAuth.getAuthorizationToken();
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and set the new header in one step.
    if (authAdminToken !== ''){
      this.authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authAdminToken } });
    }
    else if (authToken !== ''){
      this.authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
    }
    else{
      this.authReq = req.clone({ setHeaders: { Authorization: 'Bearer ' + authToken } });
    }

    // send cloned request with header to the next handler.
    return next.handle(this.authReq);
  }
}
