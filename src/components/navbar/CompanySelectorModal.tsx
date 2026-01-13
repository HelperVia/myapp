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
 * │  Component: Company Selector Modal                      │
 * └─────────────────────────────────────────────────────────┘
 */

import React from "react";
import { CompanySelectorModalProps } from "./types";
import { cn } from "./utils";

export const CompanySelectorModal: React.FC<CompanySelectorModalProps> = ({
  isOpen,
  onClose,
  companies,
  currentCompany,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] animate-in fade-in duration-200 helpervia-navbar-modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden helpervia-navbar-modal">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Select Company
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
              >
                <svg
                  className="w-5 h-5"
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
            </div>
          </div>

          {/* Company List */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
            {companies.map((company) => {
              const isActive = currentCompany?.id === company.id;

              return (
                <div
                  key={company.id}
                  onClick={() => {
                    onSelect(company);
                    onClose();
                  }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 cursor-pointer transition-all duration-200",
                    "border-b border-gray-100 last:border-b-0",
                    "hover:scale-[1.02] hover:shadow-sm",
                    isActive
                      ? "bg-primary-50 hover:bg-primary-100"
                      : "hover:bg-gray-50"
                  )}
                >
                  {/* Company Avatar with Animation */}
                  <div className="relative shrink-0">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center",
                        "font-semibold text-white text-lg transition-all duration-300",
                        isActive ? "bg-primary-500" : "bg-secondary-500"
                      )}
                    >
                      {company.initials}
                    </div>
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-in zoom-in duration-300">
                        <svg
                          className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Company Info */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "font-medium truncate transition-colors",
                        isActive ? "text-primary-600" : "text-gray-900"
                      )}
                    >
                      {company.name}
                    </div>
                    {isActive && (
                      <div className="text-xs text-primary-500 mt-0.5">
                        Currently active
                      </div>
                    )}
                  </div>

                  {/* Arrow Icon */}
                  <svg
                    className={cn(
                      "w-5 h-5 shrink-0 transition-all duration-200",
                      isActive
                        ? "text-primary-500 rotate-0"
                        : "text-gray-400 -rotate-90"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
