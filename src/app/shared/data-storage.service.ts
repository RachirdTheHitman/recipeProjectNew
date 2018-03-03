import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://yz-recipe-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get('https://yz-recipe-book.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
              // console.log(recipe);
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          // const transferedJson = response.json();
          // for (let recipe of transferedJson) {
          //   delete recipe.__proto__;
          // }
          // const recipes: Recipe[] = transferedJson;
          // const recipes: Recipe[] = response.json();
          // console.log(recipes);
          this.recipeService.updataRecipes(recipes);
        }
      );
  }

}
