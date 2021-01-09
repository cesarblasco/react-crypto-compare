export interface ITableColumn {
  title: string;
  key: string; // Key to display the value on the table cell, also used as the default sort value automatically
  isVisible: boolean;
  render: (data: any) => JSX.Element,
  isSortable: boolean;
  sortBy?: string; // If you need to display multiple values from the object in the table cell, use this value to specify which key to sort by
  width?: number;
  tooltip?: string;
  actionHeader?: any;
  currentSort?: any;
}
