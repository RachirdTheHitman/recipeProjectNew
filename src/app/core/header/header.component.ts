import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {RecipeService} from '../../recipes/recipe.service';
import {AuthService} from '../../auth/auth.service';
import {HttpEvent} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private dataStoreService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStoreService.storeRecipes()
      .subscribe(
        // (response: HttpEvent<Object>) => {
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
  onLogout() {
    this.authService.logout();
  }

  // isAuth() {
  //   return this.authService.isAuthenticated();
  // }
}
