import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';

const routes: Routes = [
    { path: "home", component: HomeComponent},
    { path: "products", component: ProductComponent},
    { path: "product-add", component: ProductAddComponent },
    { path: 'category/:categoryId', component: ProductListComponent},
    { path: 'categories' , component: CategoryAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
