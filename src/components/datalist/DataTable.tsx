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
 * │  Component: DataTable                                   │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useMemo, useCallback } from "react";
import { DataTableProps, SortConfig } from "./types";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

export function DataTable<T = any>({
  data,
  columns,
  keyExtractor = (item: any) => item.id || Math.random().toString(),

  // Search
  searchValue,
  onSearchChange,
  searchKeys = [],
  renderSearchInput,

  // Sort
  sortable = true,
  sortConfig,
  onSortChange,
  sortOptions = [],
  renderSortSelect,

  // Column filters
  columnFilters = [],
  onColumnFiltersChange,

  // Table settings
  showHeader = true,
  stickyHeader = false,
  maxHeight,
  minHeight,

  // Empty state
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filters",
  emptyIcon,

  // Loading
  loading = false,
  loadingRows = 5,

  // Events
  onRowClick,

  // Styling
  className = "",
  tableClassName = "",
  headerClassName = "",
  bodyClassName = "",
  rowClassName = "",

  // Advanced
  striped = false,
  hoverable = true,
  bordered = false,
}: DataTableProps<T>) {
  // Get nested value helper
  const getNestedValue = useCallback((obj: any, path: string): any => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  }, []);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchValue && searchKeys.length > 0) {
      const query = searchValue.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = getNestedValue(item, key);
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Column filters
    if (columnFilters.length > 0) {
      result = result.filter((item) => {
        return columnFilters.every((filter) => {
          const value = getNestedValue(item, filter.key);
          const filterValue = filter.value;
          const operator = filter.operator || "equals";

          if (
            filterValue === null ||
            filterValue === undefined ||
            filterValue === ""
          ) {
            return true;
          }

          const strValue = String(value).toLowerCase();
          const strFilter = String(filterValue).toLowerCase();

          switch (operator) {
            case "equals":
              return strValue === strFilter;
            case "contains":
              return strValue.includes(strFilter);
            case "startsWith":
              return strValue.startsWith(strFilter);
            case "endsWith":
              return strValue.endsWith(strFilter);
            case "gt":
              return Number(value) > Number(filterValue);
            case "lt":
              return Number(value) < Number(filterValue);
            case "gte":
              return Number(value) >= Number(filterValue);
            case "lte":
              return Number(value) <= Number(filterValue);
            default:
              return true;
          }
        });
      });
    }

    // Sort
    if (sortConfig && sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const column = columns.find((col) => col.key === sortConfig.key);
        const aValue = column?.getValue
          ? column.getValue(a)
          : getNestedValue(a, sortConfig.key);
        const bValue = column?.getValue
          ? column.getValue(b)
          : getNestedValue(b, sortConfig.key);

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [
    data,
    searchValue,
    searchKeys,
    columnFilters,
    sortConfig,
    columns,
    getNestedValue,
  ]);

  // Handle column sort
  const handleColumnSort = useCallback(
    (columnKey: string) => {
      if (!sortable || !onSortChange) return;

      if (sortConfig?.key === columnKey) {
        if (sortConfig.direction === "asc") {
          onSortChange({ key: columnKey, direction: "desc" });
        } else if (sortConfig.direction === "desc") {
          onSortChange({ key: "", direction: null });
        } else {
          onSortChange({ key: columnKey, direction: "asc" });
        }
      } else {
        onSortChange({ key: columnKey, direction: "asc" });
      }
    },
    [sortable, sortConfig, onSortChange]
  );

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <tbody className={cn(bodyClassName)}>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="animate-pulse">
          {columns.map((column) => (
            <td
              key={column.key}
              className={cn("px-6 py-4", column.cellClassName)}
              style={column.cellStyle}
            >
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  // Empty state
  const renderEmptyState = () => (
    <tbody>
      <tr>
        <td colSpan={columns.length} className="px-6 py-12">
          <div className="text-center helpervia-datatable-empty">
            {emptyIcon || (
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            )}
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {emptyTitle}
            </h3>
            <p className="text-sm text-gray-500">{emptyDescription}</p>
          </div>
        </td>
      </tr>
    </tbody>
  );

  // Get row class name
  const getRowClassName = useCallback(
    (item: T, index: number) => {
      const base = cn(
        "helpervia-datatable-row",
        onRowClick && "cursor-pointer",
        hoverable && "hover:bg-gray-50",
        striped && index % 2 === 0 && "bg-gray-50/50"
      );

      if (typeof rowClassName === "function") {
        return cn(base, rowClassName(item, index));
      }

      return cn(base, rowClassName);
    },
    [onRowClick, hoverable, striped, rowClassName]
  );

  // Container style
  const containerStyle: React.CSSProperties = {
    height: maxHeight,
    maxHeight: maxHeight,
    minHeight: minHeight,
    overflow: maxHeight ? "auto" : undefined,
  };

  return (
    <div
      className={cn("helpervia-datatable-container h-full", className)}
      style={containerStyle}
    >
      <div
        className={cn(
          "h-full overflow-x-auto bg-white rounded-lg shadow-sm",
          bordered && "border border-gray-200"
        )}
      >
        <table className={cn("w-full helpervia-datatable", tableClassName)}>
          {/* Table Header */}
          {showHeader && (
            <thead
              className={cn(
                "bg-gray-50 border-b border-gray-200",
                stickyHeader && "sticky top-0 z-50",
                headerClassName
              )}
            >
              <tr>
                {columns.map((column) => {
                  const isSorted = sortConfig?.key === column.key;
                  const sortDirection = isSorted ? sortConfig.direction : null;

                  return (
                    <th
                      key={column.key}
                      className={cn(
                        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        sortable &&
                          column.sortable &&
                          "cursor-pointer select-none hover:bg-gray-100 transition-colors",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.headerClassName
                      )}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        maxWidth: column.maxWidth,
                        ...column.headerStyle,
                      }}
                      onClick={() =>
                        column.sortable && handleColumnSort(column.key)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span>{column.header}</span>
                        {sortable && column.sortable && (
                          <div className="flex flex-col">
                            <svg
                              className={cn(
                                "w-3 h-3 transition-colors",
                                sortDirection === "asc"
                                  ? "text-gray-900"
                                  : "text-gray-300"
                              )}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <svg
                              className={cn(
                                "w-3 h-3 -mt-1 transition-colors",
                                sortDirection === "desc"
                                  ? "text-gray-900"
                                  : "text-gray-300"
                              )}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}

          {/* Table Body */}
          {loading ? (
            renderLoadingSkeleton()
          ) : processedData.length === 0 ? (
            renderEmptyState()
          ) : (
            <tbody
              className={cn("bg-white divide-y divide-gray-200", bodyClassName)}
            >
              {processedData.map((item, index) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick?.(item, index)}
                  className={getRowClassName(item, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-6 py-4 text-sm text-gray-900",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.cellClassName
                      )}
                      style={column.cellStyle}
                    >
                      {column.render
                        ? column.render(item, index)
                        : column.getValue
                        ? column.getValue(item)
                        : getNestedValue(item, column.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default DataTable;
