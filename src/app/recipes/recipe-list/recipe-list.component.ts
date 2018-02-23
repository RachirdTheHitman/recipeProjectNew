import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Recipe Test 1',
      'this is a simple test',
      'https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge-v3.jpg' ),
    new Recipe('Another Test Recipe',
      'this is a simple test',
      'https://static01.nyt.com/images/2014/04/11/dining/beefstew/beefstew-articleLarge-v3.jpg' )
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected (recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
