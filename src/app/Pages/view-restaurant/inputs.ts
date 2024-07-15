import { FormObject } from "src/app/Components/form/interface";

export const RestaurantTabs = [
  {
    id: 'info',
    title: 'Restaurant Information',
  },
  {
    id: 'type',
    title: 'Type & Timing',
  },
  {
    id: 'bank',
    title: 'Bank Details',
  },
  {
    id: 'menu',
    title: 'Menu Items',
  },
  {
    id: 'preference',
    title: 'Preference',
  },
]

export const RestaurantInfoForm: Array<FormObject> = [
  {
    name: 'name',
    label: 'Restaurant name',
    size: 6,
    type: 'text',
    validators: {
      required: true,
      pattern: '^[a-zA-Z0-9 ]{3,}$',
    },
    value: null,
  },
  {
    name: 'phone_no',
    label: 'Restaurant phone no.',
    size: 6,
    type: 'number',
    validators: {
      required: true,
      pattern: '^(((91)|(0))?([6-9]{1})([0-9]{9}))$',
    },
    value: null,
  },
  {
    name: 'complete_address',
    label: 'Complete restaurant address',
    size: 12,
    type: 'text',
    validators: {
      required: true,
      pattern: '^[a-zA-Z0-9, -]{10,}$',
    },
    value: null,
  },
  {
    name: 'fssai_licence',
    label: 'FSSAI License',
    size: 6,
    type: 'number',
    validators: {
      required: true,
      pattern: '^[0-9]{14}$',
    },
    value: null,
  },
  {
    name: 'pan_no',
    label: 'PAN number',
    size: 6,
    type: 'text',
    validators: {
      required: true,
      pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}',
    },
    value: null,
  },
  {
    name: 'image',
    label: 'Image URL',
    size: 12,
    type: 'text',
    validators: {
      required: true,
    },
    value: null,
  },
  {
    name: 'keywords',
    label: 'Keywords',
    size: 12,
    type: 'text',
    validators: {
      required: true,
      pattern: '^[A-Za-z, ]{5,100}$',
    },
    value: null,
  }
];

export const RestaurantTimeForm: Array<FormObject> = [
  {
    name: 'type',
    label: 'Restaurant type',
    size: 12,
    type: 'btn-check',
    validators: {
      required: true,
    },
    list: [
      {
        id: 'veg',
        label: 'Vegiterian',
        checked: false
      },
      {
        id: 'nonveg',
        label: 'Non Vegiterian',
        checked: false
      },
    ],
    value: null,
  },
  {
    name: 'start_time',
    label: 'Restaurant opening time',
    size: 6,
    type: 'time',
    validators: {
      required: true,
    },
    value: null,
  },
  {
    name: 'end_time',
    label: 'Restaurant closing time',
    size: 6,
    type: 'time',
    validators: {
      required: true,
    },
    value: null,
  }
];

export const RestaurantBankForm: Array<FormObject> = [
  {
    name: 'holder_name',
    label: 'Account holder name',
    size: 12,
    type: 'text',
    validators: {
      required: true,
      pattern: '^[a-zA-Z0-9 ]{3,}$'
    },
    value: null,
  },
  {
    name: 'acc_no',
    label: 'Account number',
    size: 6,
    type: 'number',
    validators: {
      required: true,
      pattern: '^[0-9]{11,16}$',
    },
    value: null,
  },
  {
    name: 'ifsc_code',
    label: 'IFSC code',
    size: 6,
    type: 'text',
    validators: {
      required: true,
      pattern: '^[A-Z]{4}0[A-Z0-9]{6}$',
    },
    value: null,
  }
];

export const RestaurantPreferenceForm: Array<FormObject> = [
  {
    name: 'online',
    label: 'Restaurant Online',
    size: 12,
    type: 'switch',
    validators: {
      required: true,
    },
    value: null,
  },
  {
    name: 'delivery',
    label: 'Available for deliveries',
    size: 12,
    type: 'switch',
    validators: {
      required: true,
    },
    value: null,
  },
  {
    name: 'takeaway',
    label: 'Available for takeaway',
    size: 12,
    type: 'switch',
    validators: {
      required: true,
    },
    value: null,
  },
  {
    name: 'seat_booking',
    label: 'Seat bookings',
    size: 12,
    type: 'switch',
    validators: {
      required: true,
    },
    value: null,
  },
];