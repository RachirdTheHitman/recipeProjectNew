import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import {Store} from '@ngrx/store';
import {HttpClient, HttpRequest} from '@angular/common/http';

import * as RecipeActions from '../store/recipe.actions';
import {Recipe} from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://yz-recipe-book.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json'
        })
    })
    .map(
      (recipes) => {
        // const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
            // console.log(recipe);
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
        // return recipes;
        // console.log(recipes);
        // return [];
      }
    );
    // .subscribe(
    //   (recipes: Recipe[]) => {
    //     // const transferedJson = response.json();
    //     // for (let recipe of transferedJson) {
    //     //   delete recipe.__proto__;
    //     // }
    //     // const recipes: Recipe[] = transferedJson;
    //     // const recipes: Recipe[] = response.json();
    //     // console.log(recipes);
    //     this.recipeService.setRecipes(recipes);
    //   }
    // );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPE)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://yz-recipe-book.firebaseio.com/recipes.json',
        state.recipes,
        {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}
