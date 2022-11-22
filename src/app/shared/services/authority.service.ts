import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { Authorities } from '../models/authorities';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private authenticationState = new ReplaySubject<Authorities[] | null>(1);

  constructor(private readonly localService: LocalService) {
  }

  hasRequiredAuthority(auth: string[]): boolean {
    const authorities = JSON.parse(this.localService.getData('authentication'));
    if (!authorities) {
      return false;
    }

    return authorities.some((authority: string) => auth.includes(authority));
  }

  updateAuthority(authorities: Authorities[]): void {
    console.log(authorities)
    this.localService.saveData('authentication', JSON.stringify(authorities));
    this.authenticationState.next(authorities)
  }

  getAuthenticationState(): Observable<Authorities[] | null> {
    return this.authenticationState.asObservable()
  }
}
