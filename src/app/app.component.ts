import { Component, OnInit } from '@angular/core';
import { NgidPaginationModel } from './ngid-pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-pagination';

  public pagination: NgidPaginationModel = new NgidPaginationModel(10);

  constructor() {}

  ngOnInit(): void {
    this.pagination.setTotalRecords(100);
  }

  public handleOnPageChange(currentPage: number): void { 
    this.pagination.reload();
  }

  public handlePageChange(perPage: number): void {
    this.pagination.setPerPage(perPage);
    this.pagination.reload();
  }

  public handleChange(totalRecords: number): void {
    this.pagination.setTotalRecords(totalRecords);
    this.pagination.reload();
  }
}
