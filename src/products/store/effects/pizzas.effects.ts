import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { DbService } from '../../services';

import { IPizza } from '../../models/pizza.model';

import * as fromActions from '../actions';

@Injectable()
export class PizzasEffects {
    constructor(private actions$: Actions, private dbService: DbService) {}

    @Effect()
    loadPizzas$ = this.actions$
        .ofType(fromActions.LOAD_PIZZAS)
        .pipe(
            switchMap(_ => this.dbService.getPizzas()),
            map(
                (pizzas: Array<IPizza>) =>
                    new fromActions.LoadPizzasSuccess(pizzas)
            ),
            catchError(error => of(new fromActions.LoadPizzasFail(error)))
        );

    @Effect()
    createPizza$ = this.actions$.ofType(fromActions.CREATE_PIZZA).pipe(
        map((action: fromActions.CreatePizza) => action.payload),
        switchMap((pizza: IPizza) => {
            return this.dbService.createPizza(pizza);
        }),
        map((pizza: IPizza) => new fromActions.CreatePizzaSuccess(pizza)),
        catchError(error => of(new fromActions.CreatePizzaFail(error)))
    );
}
