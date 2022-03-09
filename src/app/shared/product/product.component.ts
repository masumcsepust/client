import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductCreateComponent } from '../components/product-create/product-create.component';
import { faStar, faCoffee, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab as fabStar } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList: Product[];
  star: number = 4;

  constructor(private productService: ProductService, 
        private dialog: MatDialog,
        libraryF: FaIconLibrary) { 
          libraryF.addIcons(fasStar, farStar);
        }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProduct().subscribe((data: any) => {
      data.products.map(p => { if(p.price === null) {
        p.price = 0.00;
      }});
      this.productList = data.products
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      width: '40%'
    });
  }

}
