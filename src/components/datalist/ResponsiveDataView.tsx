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
 * │  Component: Responsive Data View                        │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useState, useMemo, useCallback } from "react";
import { DataTable } from "./DataTable";
import { ResponsiveDataViewProps } from "./types";

const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(" ").trim();
};

// Mobile View Component
function MobileView<T = any>({
  data,
  renderCard,
  keyExtractor,
  title,
  subtitle,
  headerActions,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  renderSearchInput,
  sortable = true,
  sortConfig,
  onSortChange,
  sortOptions = [],
  renderSortSelect,
  onItemClick,
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search",
  emptyIcon,
  loading = false,
  loadingCount = 3,
  cardClassName = "",
  maxHeight,
  stickyHeader = false,
  containerClassName = "",
}: any) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = useCallback(
    (key: string, direction: "asc" | "desc") => {
      if (onSortChange) {
        onSortChange({ key, direction });
        setShowFilters(false);
      }
    },
    [onSortChange]
  );

  const handleClearSort = useCallback(() => {
    if (onSortChange) {
      onSortChange({ key: "", direction: null });
    }
  }, [onSortChange]);

  // Container style for maxHeight
  const containerStyle: React.CSSProperties = maxHeight
    ? {
        maxHeight: maxHeight,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }
    : {};

  const cardsContainerStyle: React.CSSProperties = maxHeight
    ? {
        flex: 1,
        overflow: "auto",
      }
    : {};

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingCount }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className={cn(
            "bg-white rounded-lg border border-gray-200 p-3 animate-pulse",
            cardClassName
          )}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );

  // Empty state
  const renderEmptyState = () => (
    <div className="text-center py-12">
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
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        {emptyTitle}
      </h3>
      <p className="text-sm text-gray-500">{emptyDescription}</p>
    </div>
  );

  // Default search input
  const defaultSearchInput = (
    <div className="relative mb-3">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={searchValue || ""}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        className="w-full h-10 pl-10 pr-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
      />
      {searchValue && (
        <button
          onClick={() => onSearchChange?.("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div
      className={cn("helpervia-mobile-view", containerClassName)}
      style={containerStyle}
    >
      {/* Sticky Header */}
      <div
        className={cn(
          "p-4 bg-white border-b border-gray-200",
          stickyHeader && "sticky top-0 z-[99]"
        )}
      >
        {/* Title & Actions */}
        {(title || subtitle || headerActions) && (
          <div className="flex items-center justify-between mb-3">
            {(title || subtitle) && (
              <div>
                {title && (
                  <h1 className="text-lg font-bold text-gray-900">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-xs text-gray-500">{subtitle}</p>
                )}
              </div>
            )}
            {headerActions && <div>{headerActions}</div>}
          </div>
        )}

        {/* Search */}
        {onSearchChange &&
          (renderSearchInput
            ? renderSearchInput(searchValue || "", onSearchChange)
            : defaultSearchInput)}

        {/* Sort Button */}
        {sortable && sortOptions.length > 0 && !renderSortSelect && (
          <div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full h-10 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              <span>Sort & Filter</span>
              {sortConfig?.key && (
                <span className="ml-auto px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-xs">
                  Active
                </span>
              )}
            </button>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Sort by
                  </span>
                  {sortConfig?.key && (
                    <button
                      onClick={handleClearSort}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {sortOptions.map((option: any) => (
                    <div key={option.key} className="flex gap-2">
                      <button
                        onClick={() => handleSort(option.key, "asc")}
                        className={cn(
                          "flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors",
                          sortConfig?.key === option.key &&
                            sortConfig?.direction === "asc"
                            ? "bg-primary-500 text-white border-primary-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        {option.label} ↑
                      </button>
                      <button
                        onClick={() => handleSort(option.key, "desc")}
                        className={cn(
                          "flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors",
                          sortConfig?.key === option.key &&
                            sortConfig?.direction === "desc"
                            ? "bg-primary-500 text-white border-primary-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        {option.label} ↓
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Sort Select */}
        {sortable &&
          renderSortSelect &&
          sortConfig &&
          renderSortSelect(sortConfig, onSortChange!)}
      </div>

      {/* Cards */}
      <div className="p-4 space-y-3" style={cardsContainerStyle}>
        {loading
          ? renderLoadingSkeleton()
          : data.length === 0
          ? renderEmptyState()
          : data.map((item: any, index: number) => (
              <div
                key={keyExtractor(item)}
                onClick={() => onItemClick?.(item, index)}
                className={cn(
                  "helpervia-mobile-card",
                  onItemClick && "cursor-pointer active:bg-gray-50",
                  cardClassName
                )}
              >
                {renderCard(item, index)}
              </div>
            ))}
      </div>
    </div>
  );
}

// Main Component
export function ResponsiveDataView<T = any>(props: ResponsiveDataViewProps<T>) {
  const {
    data,
    keyExtractor = (item: any) => item.id || Math.random().toString(),
    desktopColumns,
    mobileRender,
    searchValue,
    onSearchChange,
    searchKeys = [],
    searchPlaceholder = "Search...",
    renderSearchInput,
    sortable = true,
    sortConfig,
    onSortChange,
    sortOptions = [],
    renderSortSelect,
    mobileTitle,
    mobileSubtitle,
    mobileHeaderActions,
    mobileMaxHeight,
    mobileStickyHeader = false,
    desktopTitle,
    desktopSubtitle,
    desktopHeaderActions,
    stickyHeader = false,
    maxHeight,
    emptyTitle = "No results found",
    emptyDescription = "Try adjusting your search or filters",
    emptyIcon,
    loading = false,
    loadingCount = 5,
    onItemClick,
    className = "",
    mobileCardClassName = "",
    desktopClassName = "",
    mobileContainerClassName = "",
  } = props;

  // Process data for mobile (search, filter, sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchValue && searchKeys.length > 0) {
      const query = searchValue.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = key.split(".").reduce((obj: any, k) => obj?.[k], item);
          return String(value).toLowerCase().includes(query);
        })
      );
    }

    // Sort
    if (sortConfig && sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const sortOption = sortOptions.find(
          (opt) => opt.key === sortConfig.key
        );
        const aValue = sortOption?.getValue
          ? sortOption.getValue(a)
          : (a as any)[sortConfig.key];
        const bValue = sortOption?.getValue
          ? sortOption.getValue(b)
          : (b as any)[sortConfig.key];

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
  }, [data, searchValue, searchKeys, sortConfig, sortOptions]);

  return (
    <div className={cn("helpervia-responsive-view h-full", className)}>
      {/* Desktop View */}
      <div className={cn("hidden md:block h-full", desktopClassName)}>
        <DataTable
          data={data}
          columns={desktopColumns}
          keyExtractor={keyExtractor}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchKeys={searchKeys}
          renderSearchInput={renderSearchInput}
          sortable={sortable}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
          sortOptions={sortOptions}
          renderSortSelect={renderSortSelect}
          stickyHeader={stickyHeader}
          maxHeight={maxHeight}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyIcon={emptyIcon}
          loading={loading}
          loadingRows={loadingCount}
          onRowClick={onItemClick}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden h-full overflow-auto">
        <MobileView
          data={processedData}
          renderCard={mobileRender}
          keyExtractor={keyExtractor}
          title={mobileTitle}
          subtitle={mobileSubtitle}
          headerActions={mobileHeaderActions}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          renderSearchInput={renderSearchInput}
          sortable={sortable}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
          sortOptions={sortOptions}
          renderSortSelect={renderSortSelect}
          onItemClick={onItemClick}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyIcon={emptyIcon}
          loading={loading}
          loadingCount={loadingCount}
          cardClassName={mobileCardClassName}
          maxHeight={mobileMaxHeight}
          stickyHeader={mobileStickyHeader}
          containerClassName={mobileContainerClassName}
        />
      </div>
    </div>
  );
}

export default ResponsiveDataView;
