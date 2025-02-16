import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from '../Service/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = []

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.categoryService.getCategories(params["category"]).subscribe((data) => {
        console.log(data)
        this.categories = data
      })
    })


  }
}
