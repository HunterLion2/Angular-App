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

  product: Product[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
   ) {}


  ngOnInit(): void {
    this.route.params.subscribe( params => { // Buradaki route yapısı angular'ın içinde olan bir yapıdır kütüphaneden çekip kullanırız buradaki params ise parametre anlamına gelir subscribe ise asenckron bir bilginin ne zaman geliceği belli olmadığı zaman kullanılır bu özellikde kütüphanenin içerisindedirç.

      const id = params["categoryId"];
      this.loading = true;

      this.productService.getProductsById(id).subscribe(result => {
        console.log(result)
        this.product = result; // Burada ki ...product değeri kopyalar ve id ekler.
        this.loading = false;
      });
    })
  }

  // unselectProduct() {
  //   this.unSelectElement.emit();
  // }

}
