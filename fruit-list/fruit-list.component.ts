import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FruitService, Fruit } from '../fruit.service';

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css']
})
export class FruitListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Fruit>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fruitService: FruitService) { }

  ngOnInit(): void {
    this.loadFruits();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.loadFruits(this.paginator.pageIndex, this.paginator.pageSize));
  }

  loadFruits(pageIndex: number = 0, pageSize: number = 5): void {
    this.fruitService.getFruits(pageIndex + 1, pageSize).subscribe((data: Fruit[]) => {
      this.dataSource.data = data;
    });
  }

  deleteFruit(id: number): void {
    this.fruitService.deleteFruit(id).subscribe(() => {
      this.loadFruits(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }
}
