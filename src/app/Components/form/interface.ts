export interface FormObject {
  name: string;
  type: 'text' | 'number' | 'btn-check' | 'time' | 'switch';
  label: string;
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  validators?: Validator;
  list?: Array<Option>;
  value?: any;
}

export interface Validator {
  required?: boolean;
  pattern?: string
}

interface Option {
  id: string;
  label: string;
  checked: boolean;
}