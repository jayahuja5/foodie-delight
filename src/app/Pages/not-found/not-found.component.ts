import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackButton } from 'src/app/Components/feedback/interface';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  title: string = `Don't worry - site is not crashed. It's just the page that's run into problem.`;
  icon: string = './assets/img/error_computer.png';
  homeBtn: FeedbackButton = {
    id: 'home',
    title: 'Back to home'
  };

  goHome() {
    this.router.navigate(['/restaurants']);
  }
}
