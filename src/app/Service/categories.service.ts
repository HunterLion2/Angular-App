import { Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
import { Category } from "../Categories/category.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CategoryService {

  private _url = environment.database_url;

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this._url + "categories.json")
           .pipe(
              map(data => {
                const categories: Category[] = [];

                for(const key in data) {
                  categories.push({ ...data[key], id:[key] });
                }
                return categories;
              })
            );
  }

  postCategories(form: { name: any; }):Observable<Category> {
    return this.http.post<Category>(this._url + 'categories.json' , form).pipe(
      delay(1000)
    )
  }

}
