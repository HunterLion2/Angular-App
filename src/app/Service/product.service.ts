import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, tap } from "rxjs";
import { Product } from "../product/product.model";

@Injectable()
export class ProductService {

  private url = environment.database_url;

  constructor(
      private http: HttpClient,
  ) {}


  getProducts(categoryId: number):Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'product.json').pipe(
      map((data) => {
          const products: Product[] = [];

          for(let key in data) {
            if(categoryId) {
              if(categoryId == data[key].categoryId) {
                products.push({ ...data[key], id: key })
              }
            } else {
              products.push({ ...data[key], id: key })
            }
          }
          return products;
      }),
      tap( (data) => {
        console.log(data),
        console.log(this.url)
      }),
      delay(1000)
    )
  }

  getProductsById(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products/' + id + '.json').pipe(
      delay(1000)
    );
  }

  createProduct(product: Product):Observable<Product[]> {
    return this.http.post<Product[]>(this.url + 'products/' + product.id + '.json', product).pipe(
      delay(1000)
    );
  }

}


