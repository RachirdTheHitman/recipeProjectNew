import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Recipe Test 1',
      'this is a simple test',
      'https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge-v3.jpg' ),
    new Recipe('Another Test Recipe',
      'this is a simple test',
      'https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge-v3.jpg' )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
