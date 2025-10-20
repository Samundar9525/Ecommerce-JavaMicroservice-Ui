import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products:any = []
  constructor(private orderServices : OrdersService ,private productService : ProductsService){

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
    this.loadProduct(data)
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        console.log('✅ Product fetched:', res);
        return res
      },
      error: (err) => {
        console.error('❌ Error fetching product:', err);
      }
    });
  }
}
