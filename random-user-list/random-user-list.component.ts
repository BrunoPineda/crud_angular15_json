import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RandomUserService, RandomUser } from '../random-user.service';

@Component({
  selector: 'app-random-user-list',
  templateUrl: './random-user-list.component.html',
  styleUrls: ['./random-user-list.component.css']
})
export class RandomUserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['picture', 'name', 'email', 'phone', 'location'];
  dataSource = new MatTableDataSource<RandomUser>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private randomUserService: RandomUserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.loadUsers(this.paginator.pageIndex + 1, this.paginator.pageSize));
  }

  loadUsers(page: number = 1, results: number = 10): void {
    this.randomUserService.getUsers(results, page).subscribe((data) => {
      this.dataSource.data = data.results;
    });
  }
}
