import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  formGroup: FormGroup;
  preview: string;
  constructor(private fb: FormBuilder,
      private productService: ProductService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['Tea'],
      description: ['Number one fresh that is supply from sylet'],
      productImage: [],
      price: [0.00],
      rating: [0]
    })
  }

  uploadFile(event: any) {
    if(event.target.files.length > 0) {
      const file = event.target.files[0]
      console.log(file);
      this.formGroup.patchValue({productImage: file});
      this.formGroup.get('productImage')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
  }

  createProduct() {
    this.productService.createProduct(this.formGroup.value).subscribe(data => {
      console.log(data)
    }, error => console.log(error)
    )
  }

}
