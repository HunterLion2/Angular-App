import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private product: Product | undefined
  private loading: boolean = false

  constructor() { }

  ngOnInit(): void {}



}
