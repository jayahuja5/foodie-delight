import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  private title: string = 'Title';
  private content: string = 'content';
  private show: boolean = false;
  timer: any;

  constructor(private common: CommonService) {}

  ngOnInit(): void {
    this.common.toast.subscribe((data) => {
      if (data?.title) {
        clearTimeout(this.timer ? this.timer : null);
        this.title = data.title;
        this.content = data.content;
        this.show = true;
        this.timer = setTimeout(() => {
          this.show = false;
        }, 5000);
      }
    });
  }

  public showToast(title: string, content: string) {
    this.title = title;
    this.content = content;

    setTimeout(() => {
      this.show = true;
    }, 3000);
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }

  public getShow(): boolean {
    return this.show;
  }
}
