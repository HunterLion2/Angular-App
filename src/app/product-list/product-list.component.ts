import { ProductService } from './../Service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product.model';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[] | undefined;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
  }

}
