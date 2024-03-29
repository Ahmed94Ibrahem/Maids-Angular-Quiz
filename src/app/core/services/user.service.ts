import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cachedUsers$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  url = 'https://reqres.in/api/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(page: number): Observable<any> {
    if (this.cachedUsers$.value[page]) {
      return this.cachedUsers$.value[page].asObservable();
    } else {
      return this.httpClient.get(`${this.url}?page=${page}`).pipe(
        tap((users) => {
          const updateCache = { ...this.cachedUsers$.value };
          updateCache[page] = new BehaviorSubject<any>(users);
          this.cachedUsers$.next(updateCache);
        })
      );
    }
  }

  getSingleUser(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/${id}`);
  }
}
