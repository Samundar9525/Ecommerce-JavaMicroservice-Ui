import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() productId!: number;
  @Input() productName!: string;
  @Input() category!: string;
  @Input() price!: number;
  @Input() discountedPrice!: number;
  @Input() rating!: number;
  @Input() noOfRatings!: number;
  @Input() imageUrl!: string;

  @Output() addToCartEvent = new EventEmitter();

  addToCart() {
    const selectedProduct = {
      productId: this.productId,
      productName: this.productName,
      category: this.category,
      price: this.price,
      quantity: 1
      }
    this.addToCartEvent.emit(selectedProduct);
  }

  get stars(): number[] {
    // returns array for filled stars
    return Array(Math.floor(this.rating)).fill(0);
  }

  get emptyStars(): number[] {
    // returns array for empty stars
    return Array(5 - Math.floor(this.rating)).fill(0);
  }
}
