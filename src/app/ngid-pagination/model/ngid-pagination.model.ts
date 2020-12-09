import { EventEmitter } from '@angular/core';
export class NgidPaginationModel {
    page: number;
    perPage: number;
    totalRecords: number;
    paginationRange: number;
    reloadChanges: EventEmitter<boolean> = new EventEmitter();
    constructor(perPage: number, paginationRange: number = 5) {
        this.page = 1;
        this.perPage = perPage;
        this.paginationRange = paginationRange;
    };

    setTotalRecords(totalRecords: number): void {
        this.totalRecords = +totalRecords;
    }

    setPerPage(perPage:number): void {
        this.page = 1;
        this.perPage = +perPage;
    }

    reload(): void {
        this.reloadChanges.emit(true);
    }
}