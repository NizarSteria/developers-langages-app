import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { IDeveloper } from '../interfaces';

@Injectable()
export class DataService {

    //Call Node.js 'microservice'
    private url: string = 'http://localhost:3000/api/developers/';

    constructor(private http: Http) { }

    getDevelopers(): Observable<IDeveloper[]> {
        return this.http.get(this.url)
            //.map((resp: Response) => resp.json())
            .map((res: Response) => {
                let developers = res.json();
                return developers;
            })
            .catch(this.handleError);
    }

    updateDeveloper(developer: IDeveloper) {
        return this.http.put(this.url + 'putDeveloper/' + developer.id, developer)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    deleteDeveloper(id: string) : Observable<boolean> {
        return this.http.delete(this.url + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }

    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    getRequestOptions() {
        const csrfToken = ''; //would retrieve from cookie or from page
        const options = new RequestOptions({
            headers: new Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    }

    handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }
}