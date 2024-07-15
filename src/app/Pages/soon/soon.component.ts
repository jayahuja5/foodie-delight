import { Component } from '@angular/core';

@Component({
  selector: 'app-soon',
  templateUrl: './soon.component.html',
  styleUrls: ['./soon.component.scss']
})
export class SoonComponent {
  icon: string = './assets/img/coming-soon.png';
  title: string = 'Sorry for the inconvenience. This page is under Construction, and will be available soon.';
}
