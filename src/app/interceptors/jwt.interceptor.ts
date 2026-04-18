import {Injectable, Injector} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: Subject<string | null> = new Subject<string | null>();

    constructor(private injector: Injector, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken && !this.isAuthEndpoint(request.url)) {
            request = this.addToken(request, accessToken);
        }

        return next.handle(request).catch((error: any) => {
            if (error instanceof HttpErrorResponse && error.status === 401 && !this.isAuthEndpoint(request.url)) {
                return this.handle401Error(request, next);
            }
            return Observable.throw(error);
        });
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Endpoints that do not require Bearer token and should not trigger token refresh on 401
    private isAuthEndpoint(url: string): boolean {
        return url.endsWith('/login') ||
            url.includes('loginAsDelegate') ||
            url.includes('verify-mfa') ||
            url.includes('resend-otp') ||
            url.endsWith('/refresh') ||
            url.endsWith('/logout') ||
            url.endsWith('/logout-all');
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isRefreshing) {
            return this.refreshTokenSubject
                .filter(token => token !== null)
                .take(1)
                .switchMap(token => {
                    return next.handle(this.addToken(request, token!));
                });
        }

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            this.clearAndRedirect();
            return Observable.throw('Session expired. Please login again.');
        }

        this.isRefreshing = true;
        this.refreshTokenSubject.next(null); // block queued requests

        const http = this.injector.get(HttpClient);

        return http.post<any>(environment.apiUrl + 'refresh', {refreshToken})
            .switchMap((response: any) => {
                this.isRefreshing = false;

                if (response && response.success && response.accessToken) {
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    this.updateStoredUser(response);
                    this.refreshTokenSubject.next(response.accessToken); // unblock B and C
                    return next.handle(this.addToken(request, response.accessToken));
                }

                this.clearAndRedirect();
                return Observable.throw('Token refresh failed.');
            })
            .catch((error: any) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(null);
                this.clearAndRedirect();
                return Observable.throw('Session expired. Please login again.');
            });
    }

    private updateStoredUser(response: any) {
        const user = {
            userName: response.usersName,
            userID: localStorage.getItem('mfa_user_id') || response.usersName,
            groupName: response.usersGroupName,
            groupID: response.usersGroupId,
            groupNames: response.usersGroupNames,
            groupIDs: response.usersGroupIds
        };
        localStorage.setItem('currentLoggedInUser', JSON.stringify(user));
    }

    private clearAndRedirect() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('mfa_session_id');
        localStorage.removeItem('mfa_user_id');
        localStorage.removeItem('currentLoggedInUser');
        this.router.navigate(['pages/login']);
    }
}
