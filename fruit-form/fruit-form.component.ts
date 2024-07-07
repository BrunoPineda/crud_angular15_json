import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FruitService, Fruit } from '../fruit.service';

@Component({
  selector: 'app-fruit-form',
  templateUrl: './fruit-form.component.html',
  styleUrls: ['./fruit-form.component.css']
})
export class FruitFormComponent implements OnInit {
  fruitForm: FormGroup;
  fruitId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fruitService: FruitService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fruitForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.fruitId = +params['id'];
        this.fruitService.getFruit(this.fruitId).subscribe((fruit: Fruit) => {
          this.fruitForm.patchValue(fruit);
        });
      }
    });
  }

  saveFruit(): void {
    if (this.fruitForm.valid) {
      const fruit: Fruit = this.fruitForm.value;
      if (this.fruitId !== null) {
        fruit.id = this.fruitId;
        this.fruitService.updateFruit(fruit).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.fruitService.addFruit(fruit).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
