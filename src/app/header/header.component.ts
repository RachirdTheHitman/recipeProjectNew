import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStoreService: DataStorageService,
              private recipeService: RecipeService) {}

  onSaveData() {
    this.dataStoreService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStoreService.getRecipes();
  }
  // @Output() recipeDisplayed = new EventEmitter<number>();

  // onRecipesStart() {
  //   this.recipeDisplayed.emit(1);
  // }
  //
  // onShoppingListStart() {
  //   this.recipeDisplayed.emit(2);
  // }

}
