import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
 cartItems: any[] = [];
  displayedColumns: string[] = ['product', 'quantity', 'price', 'actions'];
  discount = 0;
  noDataFlag : boolean = false;
  constructor(private service: CartService, private snackbarService: SnackbarService, private router: Router) {}

  ngOnInit() {
      const cartId = sessionStorage.getItem('cart_id');
      if (cartId) {
        this.loadActiveCart(cartId);
      } else {
        this.noDataFlag = true;
      }
  }

loadActiveCart(cartId: string): void {
  this.service.getActiveCartDetails(cartId).subscribe((orders: any[]) => {
    if (!orders || orders.length === 0) {
      this.noDataFlag = true;
      this.cartItems = [];
      return;
    }

    this.noDataFlag = false;

    this.cartItems = orders.map(order => {
      let imageUrl = 'assets/comingsoon.jpg';

      switch (order.category?.toLowerCase()) {
        case 'shirts':
        case 'shirt':
          imageUrl = 'assets/shirts.jpg';
          break;
        case 'watches':
          imageUrl = 'assets/watches.jpg';
          break;
        case 'shoes':
          imageUrl = 'assets/shoes.jpg';
          break;
        case 'jeans':
          imageUrl = 'assets/jeans.jpg';
          break;
      }

      return {
        orderId: order.orderId,
        cartId: order.cartId,
        userId: order.userId,
        productId: order.productId,
        status: order.status,
        orderDate: order.orderDate,
        productName: order.productName || 'Unknown Product',
        brand: order.brand || 'Samundar',
        size: order.size || 'XX',
        price: order.price || 0,
        discountedPrice: order.discountedPrice || order.price || 0,
        imageUrl,
        quantity: order.quantity
      };
    });
  });
}

loadPastCart(cartId: string): void {
  this.service.getCartDetails(cartId).subscribe((orders: any[]) => {
    if (!orders || orders.length === 0) {
      this.noDataFlag = true;
      this.cartItems = [];
      return;
    }

    this.noDataFlag = false;

    this.cartItems = orders.map(order => {
      let imageUrl = 'assets/comingsoon.jpg';

      switch (order.category?.toLowerCase()) {
        case 'shirts':
        case 'shirt':
          imageUrl = 'assets/shirts.jpg';
          break;
        case 'watches':
          imageUrl = 'assets/watches.jpg';
          break;
        case 'shoes':
          imageUrl = 'assets/shoes.jpg';
          break;
        case 'jeans':
          imageUrl = 'assets/jeans.jpg';
          break;
      }

      return {
        orderId: order.orderId,
        cartId: order.cartId,
        userId: order.userId,
        productId: order.productId,
        status: order.status,
        orderDate: order.orderDate,
        productName: order.productName || 'Unknown Product',
        brand: order.brand || 'Samundar',
        size: order.size || 'XX',
        price: order.price || 0,
        discountedPrice: order.discountedPrice || order.price || 0,
        imageUrl,
        quantity: order.quantity
      };
    });
  });
}



  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalDiscount() {
    return this.cartItems.reduce((sum, item) => {
      const discountPerItem = item.price - item.discountedPrice;
      return sum + (discountPerItem * item.quantity);
    }, 0);
  }

  getFinalTotal() {
    return this.getTotalPrice() - this.getTotalDiscount();
  }

  addToWishlist(item: any) {
    console.log('Added to wishlist:', item);
  }

  removeItem(item: any) {
    const cartId = sessionStorage.getItem('cart_id');
    if (!cartId) {
      this.snackbarService.show('Cart ID not found. Please login again.', false);
      return;
    }

    this.service.deleteProductFromCart(cartId, item.productId)
      .subscribe(
        response => {
          console.log("Product removed from cart successfully: ", response);
          this.snackbarService.show('Product removed from cart successfully!', true);
          // Remove from local array after successful API call
          this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
        },
        error => {
          console.error("Error removing product from cart: ", error);
          this.snackbarService.show('Failed to remove product from cart. Please try again.', false);
        }
      );
  }

  purchase() {
    const cartId = sessionStorage.getItem('cart_id');
    if (!cartId) {
      this.snackbarService.show('Cart ID not found. Please login again.', false);
      return;
    }

    if (this.cartItems.length === 0) {
      this.snackbarService.show('Your cart is empty. Add some items before purchasing.', false);
      return;
    }

    const productIds = this.cartItems.map(item => item.productId);

    this.service.placeOrder(cartId, productIds)
      .subscribe(
        response => {
          console.log("Order placed successfully: ", response);
          this.snackbarService.show('Order placed successfully!', true);
          // Clear the cart after successful order
          this.cartItems = [];
        },
        error => {
          console.error("Error placing order: ", error);
          this.snackbarService.show('Failed to place order. Please try again.', false);
        }
      );
  }

  onQuantityChange(item: any) {
    const cartId = sessionStorage.getItem('cart_id');
    if (!cartId) {
      this.snackbarService.show('Cart ID not found. Please login again.', false);
      return;
    }

    this.service.updateProductQuantity(cartId, item.productId, item.price, item.quantity)
      .subscribe(
        response => {
          console.log("Product quantity updated successfully: ", response);
          this.snackbarService.show('Quantity updated successfully!', true);
        },
        error => {
          console.error("Error updating product quantity: ", error);
          this.snackbarService.show('Failed to update quantity. Please try again.', false);
          // Revert the quantity change on error
          this.loadActiveCart(cartId);
        }
      );
  }

  continueShopping() {
    this.router.navigate(['/dashboard/products']);
  }
}
