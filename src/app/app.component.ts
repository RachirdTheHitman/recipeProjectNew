import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status = 1;

  statusFill(number: number) {
    console.log(number);
    this.status = number;
  }

}
