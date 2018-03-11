import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import {StartEdit} from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  private subscription: Subscription;
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10)
  // ];

  // constructor(private shoppinglistService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.shoppinglistService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.shoppinglistService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients ;
    //   });
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  // onIngredientAdded(newIngredient: Ingredient) {
  //   this.ingredients.push(newIngredient);
  // }

  // onIngredientAdded(newIngredient: Ingredient) {
  //   this.ingredients.push(newIngredient);
  // }

}
