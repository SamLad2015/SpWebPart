import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable()
export class MoviesListSpService {
  private apiBaseUrl:string = 'https://technoverse.sharepoint.com/sites/test2/_api/';

  constructor(private http: Http, private auth: AuthService) {
    if (!auth.isAuthenticated()) {
      auth.login();
      auth.handleAuthentication();
    }
  }

  public setApiLinkPart(linkPart: string):void{
    this.apiBaseUrl =  this.apiBaseUrl + linkPart;
  }

  public getAll(): Observable<any> {
    const headers = MoviesListSpService.createAuthorizationHeader();
    return this.http.get(this.apiBaseUrl, {
      headers: headers
    });
  }

  public getSingle(id: number): Observable<any> {
    return this.http.get(this.apiBaseUrl + id);
  }

  public add(itemName: string): Observable<any> {
    const toAdd = { ItemName: itemName };
    return this.http.post(this.apiBaseUrl, toAdd);
  }

  public update(id: number, itemToUpdate: any): Observable<any> {
    return this.http.put(this.apiBaseUrl + id, itemToUpdate);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.apiBaseUrl + id);
  }

  private static createAuthorizationHeader():any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; odata=verbose');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization', 'Bearer ' +  localStorage.getItem('access_token'));
    return headers;
  }
}

