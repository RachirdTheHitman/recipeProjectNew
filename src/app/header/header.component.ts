import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() recipeDisplayed = new EventEmitter<number>();

  onRecipesStart() {
    this.recipeDisplayed.emit(1);
  }

  onShoppingListStart() {
    this.recipeDisplayed.emit(2);
  }

}
