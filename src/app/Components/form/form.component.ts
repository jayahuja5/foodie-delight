import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormObject, Validator } from './interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  // Input Variables
  @Input() datasource: Array<FormObject> | undefined;
  @Input() btnLabel: string = 'Lorem';

  // Output Variables
  @Output() onSubmition: EventEmitter<Array<FormObject>> = new EventEmitter();

  // Local Variables
  _datasource: Array<FormObject> | undefined;
  form: FormGroup | undefined;
  prevValue: string | undefined;
  disable: boolean = false;

  constructor() {}

  ngOnChanges(change: SimpleChanges): void {
    if (
      change['datasource'] &&
      JSON.stringify(change['datasource'].currentValue) !== JSON.stringify(change['datasource'].previousValue)
    ) {
      this.generateFormGroup();
    }
  }

  ngOnInit(): void {
    if (!this.form?.controls && this.datasource && this.datasource.length) {
      this.generateFormGroup();
    }
  }

  generateFormGroup(): void {
    this._datasource = JSON.parse(JSON.stringify(this.datasource));
    this.form = undefined;
    const group: any = {};
    this._datasource &&
      this._datasource.length &&
      this._datasource.forEach((input) => {
        group[`${input.name}`] = new FormControl(
          input.value || '',
          this.setValidator(input.validators)
        );
        input.value ? (group[input.name] as FormControl).markAsTouched() : '';
        if(input.type === 'btn-check' && input.value && input.value.length) {
          input.list?.forEach(l => l.checked = input.value.includes(l.id));
        }
        if(input.type === 'switch') {
          let control = (group[input.name] as FormControl);
          control.setValue(input.value ? true : false);
          control.markAsTouched();
        }
      });
    Object.keys(group).length > 0 ? this.form = new FormGroup(group) : console.error('Empty datasource!');
    this.prevValue = JSON.stringify(this.form?.getRawValue());
    this.disable = true;
  }

  setValidator(obj?: Validator): any {
    let validators: Array<any> | null = null;
    let isValidate = Object.keys(obj ? obj : {}).length > 0;
    if (isValidate) {
      validators = [];
      obj?.required ? validators.push(Validators.required) : '';
      obj?.pattern ? validators.push(Validators.pattern(obj.pattern)) : null;
    }
    return validators;
  }

  checkUpdate(item?: any, input?: FormObject) {
    if(item) {
      input && this.form?.controls[input?.name].markAsTouched();
      let selected: Array<string> = [];
      input?.list?.forEach(item => {
        item.checked && selected.push(item.id);
      });
      input && this.form?.controls[input?.name].setValue(selected);
    }
    this.disable = JSON.stringify(this.form?.getRawValue()) === this.prevValue;
  }

  onSubmit() {
    this._datasource?.forEach(field => {
      field.value = this.form?.get(field.name)?.value || null;
    })
    this.onSubmition.emit(this._datasource);
  }
}
