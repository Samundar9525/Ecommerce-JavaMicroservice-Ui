import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ecommerce-Ui';

  ngOnDestroy() {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("cart_id");
    sessionStorage.removeItem("user_name");
  }
}
