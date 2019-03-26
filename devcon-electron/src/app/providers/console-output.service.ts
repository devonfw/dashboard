import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class ConsoleOutputService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  getMessages(): Observable<string[]> {
    ipcRenderer.on('');
    return of(this.messages);
  }
}
