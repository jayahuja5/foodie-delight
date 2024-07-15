import { Time } from "@angular/common";

export class RestauarntDetails {
    id: string = '----';
    basicDetails: BasicDetails | null = null;
    typeTiming: TypeTiming | null = null;
    bankDetails: BankDetails | null = null;
    menuItems: Array<Items> | null = null;
    preference: Preference | null = null;
}

export interface BasicDetails {
    name: string;
    phone_no: number;
    complete_address: string;
    fssai_licence: number;
    pan_no: number;
    image: string;
    keywords: string
}

export interface TypeTiming {
    type: ['veg' | 'nonveg'];
    start_time: string;
    end_time: string;
}

export interface BankDetails {
    acc_no: number;
    ifsc: string;
    holder_name: string;
}

export interface Items {
    name: string;
    type: 'veg' | 'nonveg';
    price: number;
    image: string;
    desc?: string;
}

export interface Preference {
    online: boolean;
    delivery: boolean;
    takeaway: boolean;
    seat_booking: boolean;
}