import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedbackButton } from './interface';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() image: string = '';
  @Input() button: FeedbackButton | undefined;
  @Output() btnClick: EventEmitter<string> = new EventEmitter();
}
