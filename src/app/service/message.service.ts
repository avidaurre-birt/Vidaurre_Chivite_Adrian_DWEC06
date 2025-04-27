import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export type MessageType = 'success' | 'error' | 'warning' | 'info';
export type MessageAction = {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary' | 'link';
};

export interface GlobalMessage {
  content: string;
  type: MessageType;
  icon?: string; // Opcional: Ícono FontAwesome o Material
  duration?: number; // Duración en milisegundos (0 = no auto-ocultar)
  actions?: MessageAction[];
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSource = new BehaviorSubject<GlobalMessage | null>(null);
  currentMessage$ = this.messageSource.asObservable();

  constructor(private router: Router) {}

  showMessage(message: GlobalMessage) {
    this.messageSource.next(message);
    
    // Auto-ocultar si tiene duración
    if (message.duration && message.duration > 0) {
      setTimeout(() => this.clear(), message.duration);
    }
  }

  clear() {
    this.messageSource.next(null);
  }

  // Helpers predefinidos
  success(content: string, actions?: MessageAction[]) {
    this.showMessage({ content, type: 'success', actions });
  }

  error(content: string, actions?: MessageAction[], duration?: number) {
    this.showMessage({ content, type: 'error', actions, duration });
  }

  warning(content: string, actions?: MessageAction[]) {
    this.showMessage({ content, type: 'warning', actions });
  }
  

}