import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    // const token = this.authService.getToken();
    // const header = new HttpHeaders().set('Authorization', 'hello world');
    // return this.httpClient.put('https://yz-recipe-book.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(),
    // return this.httpClient.put('https://yz-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: new HttpHeaders().set('Authorization', 'hello world')
    //   });
    const req = new HttpRequest('PUT', 'https://yz-recipe-book.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      // {reportProgress: true, params: new HttpParams().set('auth', token)});
      {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();

    // return this.httpClient.get<Recipe[]>('https://yz-recipe-book.firebaseio.com/recipes.json?auth=' + token)
    return this.httpClient.get<Recipe[]>('https://yz-recipe-book.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json'
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
          return recipes;
          // console.log(recipes);
          // return [];
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
