import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Service/product.service';
import { Product } from './product.model';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}


  ngOnInit(): void {

    this.route.params.subscribe( (params) => {
      this.loading = true;

      this.productService.getProducts(params["categoryId"]).subscribe(data => {
        this.products = data;
        this.loading = false;
      });
    });
  }
}
