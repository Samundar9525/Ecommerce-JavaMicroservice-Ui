import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.scss']
})
export class PastOrdersComponent implements OnInit {
  pastOrders: any[] = [];
  groupedOrders: { [date: string]: any[] } = {};
  displayedColumns: string[] = ['orderId', 'product', 'quantity', 'price'];
  loadingStates: { [date: string]: boolean } = {};
  loadedDates: Set<string> = new Set();
  isLoadingInitial = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadInitialDates();
  }

  loadInitialDates(): void {
    this.isLoadingInitial = true;
    const cartId = sessionStorage.getItem('cart_id');

    if (cartId) {
      this.cartService.getCartDetails(cartId).subscribe((orders: any[]) => {
        if (!orders || orders.length === 0) {
          this.isLoadingInitial = false;
          return;
        }

        // Group orders by date to get available dates
        const dateGroups: { [date: string]: any[] } = {};
        orders.forEach(order => {
          const date = new Date(order.orderDate).toDateString();
          if (!dateGroups[date]) {
            dateGroups[date] = [];
          }
          dateGroups[date].push(order);
        });

        // Initialize groupedOrders with empty arrays for each date
        this.groupedOrders = {};
        Object.keys(dateGroups).forEach(date => {
          this.groupedOrders[date] = [];
        });

        this.isLoadingInitial = false;
      });
    } else {
      this.isLoadingInitial = false;
    }
  }

  loadPastOrders(cartId: string): void {
    this.cartService.getCartDetails(cartId).subscribe((orders: any[]) => {
      if (!orders || orders.length === 0) {
        this.pastOrders = [];
        return;
      }

      this.pastOrders = orders.map(order => {
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

      this.groupOrdersByDate();
    });
  }

  loadOrdersForDate(date: string): void {
    if (this.loadedDates.has(date)) {
      return; // Already loaded
    }

    this.loadingStates[date] = true;
    const cartId = sessionStorage.getItem('cart_id');

    if (cartId) {
      this.cartService.getCartDetails(cartId).subscribe((orders: any[]) => {
        if (!orders || orders.length === 0) {
          this.loadingStates[date] = false;
          return;
        }

        const dateOrders = orders.filter(order => {
          const orderDate = new Date(order.orderDate).toDateString();
          return orderDate === date;
        }).map(order => {
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

        this.groupedOrders[date] = dateOrders;
        this.loadedDates.add(date);
        this.loadingStates[date] = false;
      });
    } else {
      this.loadingStates[date] = false;
    }
  }

  onPanelOpened(date: string): void {
    this.loadOrdersForDate(date);
  }

  groupOrdersByDate(): void {
    this.groupedOrders = {};
    this.pastOrders.forEach(order => {
      const date = new Date(order.orderDate).toDateString();
      if (!this.groupedOrders[date]) {
        this.groupedOrders[date] = [];
      }
      this.groupedOrders[date].push(order);
    });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
