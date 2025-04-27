import { Component } from '@angular/core';
import { MessageService, GlobalMessage, MessageAction } from '../../service/message.service';

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  message: GlobalMessage | null = null;

  constructor(private messageService: MessageService) {
    this.messageService.currentMessage$.subscribe(msg => {
      this.message = msg;
    });
  }

  handleAction(action: MessageAction) {
    action.action();
    this.dismiss();
  }

  dismiss() {
    this.messageService.clear();
  }
}
