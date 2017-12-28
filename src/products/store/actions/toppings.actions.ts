import { Action } from '@ngrx/store';
import { ITopping } from '../../models/topping.model';

export const LOAD_TOPPINGS = '[Products] Get Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] Get Toppings Fail';
export const LOAD_TOPPINGS_SUCCSESS = '[Products] Get Toppings Success';
export const SELECT_TOPPINGS = '[Products] Select toppings for visualisation';

// actions

export class LoadToppings implements Action {
    readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsSuccess implements Action {
    readonly type = LOAD_TOPPINGS_SUCCSESS;

    constructor(public payload: Array<ITopping>) {}
}

export class LoadToppingsFail implements Action {
    readonly type = LOAD_TOPPINGS_FAIL;

    constructor(public payload: any) {}
}

export class SelectToppings implements Action {
    readonly type = SELECT_TOPPINGS;

    constructor(public payload: Array<number>) {}
}

// action types

export type TToppingsActions = LoadToppings | LoadToppingsSuccess | LoadToppingsFail | SelectToppings;
