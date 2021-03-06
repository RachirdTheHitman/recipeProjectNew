import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
              // private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    // this.dataStoreService.storeRecipes()
    //   .subscribe(
    //     // (response: HttpEvent<Object>) => {
    //     (response) => {
    //       console.log(response);
    //     }
    //   );
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStoreService.getRecipes();
    this.store.dispatch(new RecipeActions.FetchRecipes());
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
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  // isAuth() {
  //   return this.authService.isAuthenticated();
  // }
}
