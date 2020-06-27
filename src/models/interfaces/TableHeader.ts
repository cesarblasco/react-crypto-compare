export interface ITableHeader {
  title: string;
  sortBy: string;
  isVisible: boolean;
  width?: number;
  tooltip?: string;
  actionHeader?: any;
  currentSort?: any;
}
