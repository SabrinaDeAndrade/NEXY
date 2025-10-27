import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {
  private activeViewSubject = new BehaviorSubject<string>('produtos'); 
  public activeView$ = this.activeViewSubject.asObservable();

  constructor() { }

  /** Guarda o nome da vista ativa. */
  setActiveView(viewName: string): void {
    console.log('AdminStateService: Definindo vista ativa ->', viewName);
    this.activeViewSubject.next(viewName);
  }

  /** Obtém o nome da vista ativa guardada. */
  getActiveView(): string {
    const view = this.activeViewSubject.getValue();
    console.log('AdminStateService: Obtendo vista ativa ->', view);
    return view;
  }
}