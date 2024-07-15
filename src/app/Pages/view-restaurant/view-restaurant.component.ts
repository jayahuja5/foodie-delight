import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormObject } from 'src/app/Components/form/interface';
import { RestaurantBankForm, RestaurantInfoForm, RestaurantPreferenceForm, RestaurantTabs, RestaurantTimeForm } from './inputs';
import { CommonService } from 'src/app/Services/common.service';
import { RestauarntDetails } from './interface';

@Component({
  selector: 'app-view',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.scss'],
})
export class ViewRestaurantComponent {
  new: boolean = false;
  tabs = RestaurantTabs;
  basicDetails: Array<FormObject> | undefined;
  typeTiming: Array<FormObject> | undefined;
  bankDetails: Array<FormObject> | undefined;
  preference: Array<FormObject> | undefined;
  currentSelected: string = 'info';
  btnLabel: string = 'Update';
  restaurantDetails: RestauarntDetails = new RestauarntDetails();
  isAdd: boolean = false;
  alertMsg: string = '';
  id: string = '';
  currentRestaurant: RestauarntDetails | null = null;
  name: string = '';

  constructor(
    private aroute: ActivatedRoute,
    private route: Router,
    private titleService: Title,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    window.scrollTo({top: 0});
    this.setAlertMsg();
    this.aroute.data.subscribe((data: any) => {
      this.new = data.new;
      this.titleService.setTitle(
        (this.new ? 'Add Restaurant' : 'View') + ' | Foodie Delight'
      );
    });
    !this.new && this.aroute.params.subscribe(data => {
      this.id = data['id'];
      this.currentRestaurant = this.common.getRestaurantById(this.id);
    })
    this.setInputs();
  }

  setAlertMsg() {
    this.alertMsg = this.isAdd
      ? `Completed mandatory details, you can now add the restaurant.`
      : `To add a restaurant, it must first fill out the 'Restaurant Information', 'Type & Timing', and 'Bank Details' fields.`;
  }

  setInputs(): void {
    this.basicDetails = JSON.parse(JSON.stringify(RestaurantInfoForm));
    this.typeTiming = JSON.parse(JSON.stringify(RestaurantTimeForm));
    this.bankDetails = JSON.parse(JSON.stringify(RestaurantBankForm));
    this.preference = JSON.parse(JSON.stringify(RestaurantPreferenceForm));
    this.btnLabel = this.new ? 'Save & Next' : 'Update';
    this.currentRestaurant?.id && this.setCurrentRestaurantValue();
  }

  setCurrentRestaurantValue(): void {
    if(this.currentRestaurant){
      Object.keys(this.currentRestaurant).forEach((e: string) => {
        if(e !== 'id') {
          let item: any = (this.currentRestaurant as any)[e];
          let main: any = (this as any)[e];
          if(item && main && main.length) {
            Object.keys(item).forEach(n => {
              let temp = main.find((k: { name: string; }) => k.name === n);
              temp.value = item[n];
            })
          }
        }
      });
      this.name = this.basicDetails?.find(d => d.name === 'name')?.value ?? '';
    }
  }

  changeTab(selectd: string) {
    this.currentSelected = selectd;
    this.btnLabel = this.new
      ? selectd === 'preference'
        ? 'Save'
        : 'Save & Next'
      : 'Update';
  }

  saveDetails(event: Array<FormObject>, type: string): void {
    this.btnLabel = this.new ? 'Save & Next' : 'Update';
    let msg = 'Details saved Successfully...';
    switch (type) {
      case 'info':
        this.basicDetails = event;
        this.common.showToast('Restaurant Information', msg);
        this.new ? (this.currentSelected = 'type') : '';
        this.name = this.basicDetails?.find(d => d.name === 'name')?.value ?? '';
        break;
      case 'type':
        this.typeTiming = event;
        this.common.showToast('Type & Timing', msg);
        this.new ? (this.currentSelected = 'bank') : '';
        break;
      case 'bank':
        this.bankDetails = event;
        this.common.showToast('Bank Details', msg);
        this.new ? (this.currentSelected = 'menu') : '';
        break;
      case 'preference':
        this.preference = event;
        this.common.showToast('Preferences', msg);
        this.btnLabel = this.new ? 'Save' : 'Update';
        break;
    }
    this.isAdd =
      this.new &&
      this.checkFilled(this.basicDetails || []) &&
      this.checkFilled(this.typeTiming || []) &&
      this.checkFilled(this.bankDetails || []);
    this.setAlertMsg();
    if(!this.new && this.id) {
      this.setValues();
      this.common.updateRestaurantDetailsById(this.restaurantDetails);
    }
    console.log(this.isAdd);
  }

  checkFilled(obj: FormObject[]): boolean {
    return obj
      ? obj.reduce((i: boolean, a: FormObject) => {
          return a.value && a.value && a.value.length >= 1 ? true : false;
        }, false)
      : true;
  }

  addRestaurant(): void {
    this.setValues();
    this.common.addRestuarant(this.restaurantDetails);
    this.route.navigate(['restaurants']);
  }

  setValues(): void {
    this.restaurantDetails.id = this.id;
    this.restaurantDetails.basicDetails = this.extractValues(this.basicDetails || []);
    this.restaurantDetails.typeTiming = this.extractValues(this.typeTiming || []);
    this.restaurantDetails.bankDetails = this.extractValues(this.bankDetails || []);
    this.restaurantDetails.preference = this.extractValues(this.preference || []);
  }

  extractValues(obj: FormObject[]): any {
    if(obj && obj.length){
      let tempObj: any = {};
      obj.forEach(o => {
        tempObj[o.name] = o.value;
      })
      return tempObj;
    }
    return null;
  }

  deleteRestaurant(): void {
    this.common.deleteRestuarant(this.id);
    this.common.showToast('Name', 'Restuarant deleted Successfully...');
    this.route.navigate(['/restaurants'], { replaceUrl: true });
  }
}
