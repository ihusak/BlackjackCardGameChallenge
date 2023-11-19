import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface LoaderState {
  show: boolean;
  index: number;
}
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  show() {
    this.loaderSubject.next({ show: true, index: 0 });
  }
  hide() {
    this.loaderSubject.next({ show: false, index: 1 });
  }
}
