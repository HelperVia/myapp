/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗       │
 * │  ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗      │
 * │  ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝      │
 * │  ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗      │
 * │  ██║  ██║███████╗███████╗██║     ███████╗██║  ██║      │
 * │  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝      │
 * │                     VIA                                  │
 * ├─────────────────────────────────────────────────────────┤
 * │  Developer: Yaşar Demirtaş                              │
 * │  Email: ydemirtas1745@gmail.com                         │
 * │  Component: DataTable Types                             │
 * └─────────────────────────────────────────────────────────┘
 */

import { ReactNode, CSSProperties } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface SortOption {
  key: string;
  label: string;
  getValue?: (item: any) => any;
}

export interface ColumnFilter {
  key: string;
  value: any;
  operator?:
    | "equals"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "gt"
    | "lt"
    | "gte"
    | "lte";
}

export interface TableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (item: T, index: number) => ReactNode;
  getValue?: (item: T) => any;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: "left" | "center" | "right";
  headerClassName?: string;
  cellClassName?: string;
  headerStyle?: CSSProperties;
  cellStyle?: CSSProperties;
}

export interface DataTableProps<T = any> {
  // Data (Required)
  data: T[];
  columns: TableColumn<T>[];

  // Optional
  keyExtractor?: (item: T) => string;

  // Search
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchKeys?: string[];
  renderSearchInput?: (
    value: string,
    onChange: (value: string) => void
  ) => ReactNode;

  // Sort
  sortable?: boolean;
  sortConfig?: SortConfig;
  onSortChange?: (config: SortConfig) => void;
  sortOptions?: SortOption[];
  renderSortSelect?: (
    config: SortConfig,
    onChange: (config: SortConfig) => void
  ) => ReactNode;

  // Column Filters
  columnFilters?: ColumnFilter[];
  onColumnFiltersChange?: (filters: ColumnFilter[]) => void;

  // Table settings
  showHeader?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string | number;
  minHeight?: string | number;

  // Empty state
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: ReactNode;

  // Loading
  loading?: boolean;
  loadingRows?: number;

  // Events
  onRowClick?: (item: T, index: number) => void;

  // Styling
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((item: T, index: number) => string);

  // Advanced
  virtualized?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

export interface ResponsiveDataViewProps<T = any> {
  // Data
  data: T[];
  keyExtractor?: (item: T) => string;

  // Desktop
  desktopColumns: TableColumn<T>[];

  // Mobile
  mobileRender: (item: T, index: number) => ReactNode;

  // Search
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchKeys?: string[];
  searchPlaceholder?: string;
  renderSearchInput?: (
    value: string,
    onChange: (value: string) => void
  ) => ReactNode;

  // Sort
  sortable?: boolean;
  sortConfig?: SortConfig;
  onSortChange?: (config: SortConfig) => void;
  sortOptions?: SortOption[];
  renderSortSelect?: (
    config: SortConfig,
    onChange: (config: SortConfig) => void
  ) => ReactNode;

  // Mobile specific
  mobileTitle?: string;
  mobileSubtitle?: string;
  mobileHeaderActions?: ReactNode;
  mobileMaxHeight?: string | number;
  mobileStickyHeader?: boolean;

  // Desktop specific
  desktopTitle?: string;
  desktopSubtitle?: string;
  desktopHeaderActions?: ReactNode;
  stickyHeader?: boolean;
  maxHeight?: string | number;

  // Empty state
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: ReactNode;

  // Loading
  loading?: boolean;
  loadingCount?: number;

  // Events
  onItemClick?: (item: T, index: number) => void;

  // Styling
  className?: string;
  mobileCardClassName?: string;
  desktopClassName?: string;
  mobileContainerClassName?: string;
}
