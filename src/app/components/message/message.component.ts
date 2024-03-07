import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() title = 'Error';

  message = '';
  isHidden = true;
  destroy$$ = new Subject();

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.messageService.message$
      .pipe(takeUntil(this.destroy$$))
      .subscribe((text) => {
        this.isHidden = false;
        this.message = text;
      });
  }

  ngOnDestroy() {
    this.destroy$$.next(null);
    this.destroy$$.complete();
  }
}
