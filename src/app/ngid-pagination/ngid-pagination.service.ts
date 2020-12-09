import { EventEmitter } from '@angular/core';
import { IPaginationResult } from './interface/IPaginationResult';
import { NgidPaginationModel } from './model/ngid-pagination.model';

export class NgidPaginationService {
    private dataSource: NgidPaginationModel;
    private totalPage: number;
    private paginationNumberList: Array<number> = new Array();
    public paginationChanges: EventEmitter<Array<any>> = new EventEmitter();
    public setDataSource(dataSource: NgidPaginationModel): void {
        this.dataSource = dataSource;
    };

    public build(): IPaginationResult {
        this.doSetTotalPage();
        this.doSetPaginationNumberList();
        const paginationNumberRangeList = this.createPagination();
        return { paginationNumberRangeList, totalPage: this.totalPage };
    }

    private doSetTotalPage(): void {
        this.totalPage = Math.ceil(this.dataSource.totalRecords / this.dataSource.perPage);
    }

    private doSetPaginationNumberList(): void {
        this.paginationNumberList = Array(this.totalPage).fill(0).map((data, index) => index + 1);
    }

    private createPagination(): Array<any> {
        let paginationNumberRangeList: Array<any> = new Array();
        const rangeFromLeft = Math.floor(this.dataSource.paginationRange/2);
        if (this.paginationNumberList.length > 0) {
            const firstPaginationRange = this.dataSource.page - rangeFromLeft <= 2 ? 0 : this.dataSource.page - rangeFromLeft - 1;
            const lastPaginationRange = firstPaginationRange + this.dataSource.paginationRange;
            const last = lastPaginationRange > this.totalPage - 2 ? this.totalPage : lastPaginationRange;
            const first = last === this.totalPage && last > this.dataSource.paginationRange ? last - this.dataSource.paginationRange : firstPaginationRange;

            paginationNumberRangeList = this.paginationNumberList.slice(first, last);
            
            if (paginationNumberRangeList[0] !== 1) {
                paginationNumberRangeList = [1, '...', ...paginationNumberRangeList];
            }

            if (paginationNumberRangeList[paginationNumberRangeList.length - 1] !== this.totalPage) {
                paginationNumberRangeList = [...paginationNumberRangeList, '...', this.totalPage];
            }
        }
        return paginationNumberRangeList;
    }
}