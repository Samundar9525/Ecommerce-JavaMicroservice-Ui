import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

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
  constructor(private service: CartService) {}

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

  getFinalTotal() {
    return this.getTotalPrice() - this.discount;
  }

  addToWishlist(item: any) {
    console.log('Added to wishlist:', item);
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.orderId !== item.orderId);
  }

  purchase() {
    console.log('Purchasing:', this.cartItems);
  }

  continueShopping() {
    console.log('Continue shopping');
  }
}
