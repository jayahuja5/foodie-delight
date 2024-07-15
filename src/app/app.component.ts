import { Component } from '@angular/core';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  show: boolean = false;

  constructor(private common: CommonService) {}
  ngOnInit(): void {
    this.common.showMenu.subscribe((toggle) => {
      this.show = toggle;
    });
  }
  close() {
    this.common.toggleSideNav();
  }
}
