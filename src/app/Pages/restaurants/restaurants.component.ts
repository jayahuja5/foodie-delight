import { Component } from '@angular/core';
import { FeedbackButton } from 'src/app/Components/feedback/interface';
import { CommonService } from 'src/app/Services/common.service';
import { RestauarntDetails } from '../view-restaurant/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {

  addProductBtn: FeedbackButton = {
    id: 'addProduct',
    title: 'Add Product',
    icon: 'plus',
    iconSize: 2
  }

  emptyPage: any = {
    icon: './assets/img/no_restaurants.png',
    title: 'Seems no restaurant present',
    subtitle: 'Add as many restaurants you want',
    btn: this.addProductBtn
  }

  list: RestauarntDetails[] | null = null;
  backupList: RestauarntDetails[] | null = null;
  search: string = '';

  constructor(private common: CommonService, private route: Router) {}

  ngOnInit(): void {
    window.scrollTo({top: 0});
    this.common.getAllRestaurants();
    this.common.restaurants.subscribe((data: RestauarntDetails[] | null) => {
      let temp = data && data.length ? data : null;
      this.list = temp;
      this.backupList = temp;
    })
  }

  addProduct() {
    this.route.navigate(['/restaurants/add']);
  }

  filter() {
    if(this.search) {
      let temp = this.backupList?.filter(i => i.basicDetails?.name.toLowerCase().includes(this.search.toLowerCase()));
      this.list = temp?.length ? temp : null;
      console.log(this.list);
      
    }
    else {
      this.list = this.backupList;
    }
  }

  showMenu() {
    this.common.toggleSideNav();
  }

}
