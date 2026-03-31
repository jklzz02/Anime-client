import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../interfaces/table-column';
import { PaginatedResult } from '../../../../interfaces/paginated-result';

@Component({
  selector: 'app-dashboard-table',
  standalone: false,
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.css',
})
export class DashboardTableComponent<T = any> {
  @Input() title: string = '';
  @Input() columns: TableColumn<T>[] = [];
  @Input() data: PaginatedResult<T> | null = null;
  @Input() currentPage: number = 1;
  @Input() maxPage: number = 0;
  @Input() hasNextPage: boolean = false;
  @Input() emptyMessage: string = 'No items found.';
  @Input() rowLink!: (item: T) => any[];
  @Input() pageSize: number = 10;

  @Output() nextPage = new EventEmitter<void>();
  @Output() previousPage = new EventEmitter<void>();
  @Output() pageSizeChange = new EventEmitter<number>();

  resolveCellClass(col: TableColumn<T>, item: T): string {
    if (!col.cellClass) {
      return '';
    }
    return typeof col.cellClass === 'function'
      ? col.cellClass(item)
      : col.cellClass;
  }

  resolveCellValue(col: TableColumn<T>, item: T): any {
    if (col.accessor) {
      return col.accessor(item);
    }
    return (item as Record<string, unknown>)[col.key];
  }
}
