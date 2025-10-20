import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products:any = []
  constructor(private orderServices : OrdersService ,private productService : ProductsService, private cartService: CartService, private snackbarService: SnackbarService){

  }

ngOnInit() {
  this.orderServices.getProducts().subscribe((res: any[]) => {
    this.products = res.map((product: any) => {
      let imageUrl = 'assets/comingsoon.jpg';

      if (product.category === 'shirts') {
        imageUrl = 'assets/shirts.jpg';
      } else if (product.category === 'watches') {
        imageUrl = 'assets/watches.jpg';
      } else if (product.category === 'shoes') {
        imageUrl = 'assets/shoes.jpg';
      } else if (product.category === 'shirt') {
        imageUrl = 'assets/shirts.jpg';
      }else if (product.category === 'jeans') {
        imageUrl = 'assets/jeans.jpg';
      }
      return {
        ...product,
        imageUrl
      };
    });
  });
}

  cartHandler(data:any){
    const cartId = sessionStorage.getItem('cart_id');
    if (!cartId) {
      this.snackbarService.show('Cart ID not found. Please login again.', false);
      return;
    }

    this.cartService.addProductTocart(cartId, data.productId, data.price, data.quantity)
      .subscribe(
        response => {
          console.log("Product added to cart successfully: ", response);
          this.snackbarService.show('Product added to cart successfully!', true);
        },
        error => {
          console.error("Error adding product to cart: ", error);
          this.snackbarService.show('Failed to add product to cart. Please try again.', false);
        }
      );
  }


}
