import { TemplateRef } from '@angular/core';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  headerClass?: string;
  accessor?: (item: T) => any;
  template?: TemplateRef<{ $implicit: T }>;
  cellClass?: string | ((item: T) => string);
}
