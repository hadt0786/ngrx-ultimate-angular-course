import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ITopping } from '../../models/topping.model';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true,
};

@Component({
  selector: 'pizza-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['pizza-toppings.component.scss'],
  template: `
    <div class="pizza-toppings">
      <div 
        class="pizza-toppings-item"
        *ngFor="let topping of toppings;"
        (click)="selectTopping(topping)"
        [class.active]="existsInToppings(topping)">
        <img src="/assets/img/toppings/singles/{{ topping.name }}.svg">
        {{ topping.name }}
      </div>
    </div>
  `,
})
export class PizzaToppingsComponent implements ControlValueAccessor {
  @Input() toppings: ITopping[] = [];

  value: ITopping[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: ITopping[]) {
    this.value = value;
  }

  selectTopping(topping: ITopping) {
    if (this.existsInToppings(topping)) {
      this.value = this.value.filter(item => item.id !== topping.id);
    } else {
      this.value = [...this.value, topping];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInToppings(topping: ITopping) {
    return this.value.some(val => val.id === topping.id);
  }
}
