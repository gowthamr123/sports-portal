import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    isAuthenticated = false;
    authenticatedUser : any;
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUsers = [ 
            { id: 1, email: 'admin@gmail.com', password: 'admin', firstName: 'Gowtham', lastName: 'R', isAdmin: true },
            { id: 2, email: 'guest@gmail.com', password: 'guest', firstName: 'Guest', lastName: 'user', isAdmin: false}
        ];
        return of(null).pipe(mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/api/user/authenticate') && request.method === 'POST') {
                testUsers.forEach(user => {
                    if(user.email === request.body.email && user.password === request.body.password) {
                        this.authenticatedUser = user;
                        this.isAuthenticated = true;
                    }
                });

                if(this.isAuthenticated) {
                    let body = {
                        id: this.authenticatedUser.id,
                        username: this.authenticatedUser.username,
                        firstName: this.authenticatedUser.firstName,
                        lastName: this.authenticatedUser.lastName,
                        isAdmin: this.authenticatedUser.isAdmin,
                        token: 'fake-jwt-token'
                    };
                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    return throwError('');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};