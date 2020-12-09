import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgidPaginationModel } from './model/ngid-pagination.model';
import { NgidPaginationService } from './ngid-pagination.service';

@Component({
    selector: 'ngid-pagination',
    templateUrl: './ngid-pagination.component.html',
    styleUrls: ['./ngid-pagination.component.scss'],
    providers: [NgidPaginationService]
})
export class NgidPaginationComponent implements OnInit {
    @Input() public dataSource: NgidPaginationModel;
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();
    public totalPage: number;
    public paginationNumberRangeList:  Array<number | string> = new Array();
    constructor(private ngidPaginationService: NgidPaginationService) { }
    ngOnInit(): void {
        this.doSetDataSource();
        this.doBuildPagination();
        this.doHandleDataSourceReloadChange();
    }

    private doSetDataSource(): void {
        this.ngidPaginationService.setDataSource(this.dataSource);
    }

    private doBuildPagination(): void {
        const { paginationNumberRangeList, totalPage } = this.ngidPaginationService.build();
        this.paginationNumberRangeList = paginationNumberRangeList;
        this.totalPage = totalPage;
    }

    private doHandleDataSourceReloadChange(): void {
        this.dataSource.reloadChanges.subscribe((isReload: boolean) => {
            this.doBuildPagination();
        })
    }

    public doChangePage(currentPage: number | string): void {
        if (currentPage !== '...') {
            this.dataSource.page = +currentPage;
            this.onPageChange.emit(+currentPage);
        }
    }
}