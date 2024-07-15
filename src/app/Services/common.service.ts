import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './interface';
import { RestauarntDetails } from '../Pages/view-restaurant/interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  // Toast
  private _toast: Toast | undefined = undefined;
  toast = new BehaviorSubject<Toast | undefined>(this._toast);

  // Menu
  private _showMenu: boolean = false;
  showMenu = new BehaviorSubject<boolean>(this._showMenu);

  // Restaurants
  private _restaurants: Array<RestauarntDetails> | null = null;
  restaurants = new BehaviorSubject<Array<RestauarntDetails> | null>(this._restaurants);

  constructor() {
    this.getAllRestaurants();
  }

  showToast(title: string, content: string): void {
    this._toast = {title,content};
    console.log(this._toast);
    this.toast.next(this._toast);
  }

  toggleSideNav() {
    this._showMenu = !this._showMenu;
    this.showMenu.next(this._showMenu);
  }

  addRestuarant(obj: RestauarntDetails): void {
    this._restaurants = this.getAllRestaurants();
    let id = Math.random().toString(32).slice(2);
    if(this._restaurants === null) {
      this._restaurants = [];
      obj.id = id;
      this._restaurants.push(obj);
    }
    else {
      obj.id = id;
      this._restaurants.push(obj);
    }
    this.restaurants.next(this._restaurants);
    localStorage.setItem('restaurants', JSON.stringify(this._restaurants));
    console.log('Service_getAllRest', id);
  }
  
  deleteRestuarant(id: string): void {
    let index = this._restaurants?.findIndex(e => e.id === id) ?? -1;
    index !== -1 && this._restaurants?.splice(index,1);
    this.restaurants.next(this._restaurants);
    localStorage.setItem('restaurants', JSON.stringify(this._restaurants));
  }

  getAllRestaurants(): Array<RestauarntDetails> | null {
    let temp = localStorage.getItem('restaurants');
    this._restaurants = temp ? JSON.parse(temp) : null;
    this.restaurants.next(this._restaurants);
    return this._restaurants;
  }

  getRestaurantById(id: string): RestauarntDetails | null {
    let item = this._restaurants?.find(e => e.id === id);
    item = JSON.parse(JSON.stringify(item));
    return item ? item : null;
  }

  updateRestaurantDetailsById(updatedObj: RestauarntDetails): void {
    let index = this._restaurants?.findIndex(e => e.id === updatedObj.id) ?? -1;
    if (index !== -1 && this._restaurants) {
      this._restaurants[index] = updatedObj
      this.restaurants.next(this._restaurants);
      localStorage.setItem('restaurants', JSON.stringify(this._restaurants));
    }
  }

}
