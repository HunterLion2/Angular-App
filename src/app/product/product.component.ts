import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from '../Service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product | undefined;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(data => {
      const id = data["productId"];
      this.loading = true;

      this.productService.getProductsById(id).subscribe(result => {
        this.loading = false;
      });
    })

  }



}
