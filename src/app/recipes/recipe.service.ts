import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  sendToShoppingList = new EventEmitter<Ingredient[]>();
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {}

  private recipes: Recipe[] = [
    new Recipe(
      'Stewed Beef',
      'this is a dish sample of stewed beef',
      'https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge-v3.jpg',
      [
        new Ingredient('beef', 1),
        new Ingredient('carrots', 2)
      ]),
    new Recipe(
      'Burger I like',
      'this is a sample of burger',
      'http://bk-apac-prd.s3.amazonaws.com/sites/burgerking.co.nz/files/BUR2423D_Kings-Collection_PRODUCT_300x270_02%5B1%5D.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 5)
      ])
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipesChanged.next(this.recipes.slice());
  // }
  //
  // updateRecipe(index: number, newRecipe: Recipe) {
  //   this.recipes[index] = newRecipe;
  //   this.recipesChanged.next(this.recipes.slice());
  // }

  // updateRecipes(recipes: Recipe[]) {
  //   this.recipes = recipes;
  //   this.recipesChanged.next(this.recipes.slice());
  // }
  //
  // addToShoppingList(ingredients: Ingredient[]) {
  //   // this.slService.addIngredients(ingredients);
  //   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  //
  //   // for (let i = 0; i++; i < ingredients.length) {
  //   //   this.slService.addIngredient(ingredients[i]);
  //   // }
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipesChanged.next(this.recipes.slice());
  // }

}
