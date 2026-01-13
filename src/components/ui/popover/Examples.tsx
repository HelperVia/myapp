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
 * │  Component: Popover Examples                            │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useState } from "react";
import { Popover } from "./Popover";

// Simple Button Component
const Button: React.FC<{
  children: React.ReactNode;
  variant?: string;
  onClick?: () => void;
}> = ({ children, variant = "primary", onClick }) => {
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 border border-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        variants[variant as keyof typeof variants]
      }`}
    >
      {children}
    </button>
  );
};

export const PopoverExamples: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Popover Component</h1>
          <p className="text-gray-600">
            Flexible popover component with multiple placements and features
          </p>
        </div>

        {/* Basic Popover */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Basic Popover</h2>
          <div className="flex gap-4">
            <Popover
              trigger={<Button>Show Popover</Button>}
              content={
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Popover Title</h3>
                  <p className="text-sm text-gray-600">
                    This is a basic popover with some content.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Placements */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Placements</h2>
          <div className="grid grid-cols-3 gap-12 place-items-center min-h-[400px]">
            {/* Top */}
            <div className="flex flex-col gap-4">
              <Popover
                trigger={<Button variant="secondary">Top Start</Button>}
                content={
                  <div className="p-4 min-w-[200px]">Top Start Placement</div>
                }
                placement="top-start"
              />
              <Popover
                trigger={<Button variant="secondary">Top</Button>}
                content={<div className="p-4 min-w-[200px]">Top Placement</div>}
                placement="top"
              />
              <Popover
                trigger={<Button variant="secondary">Top End</Button>}
                content={
                  <div className="p-4 min-w-[200px]">Top End Placement</div>
                }
                placement="top-end"
              />
            </div>

            {/* Left & Right */}
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-4">
                <Popover
                  trigger={<Button variant="secondary">Left Start</Button>}
                  content={<div className="p-4 min-w-[200px]">Left Start</div>}
                  placement="left-start"
                />
                <Popover
                  trigger={<Button variant="secondary">Left</Button>}
                  content={<div className="p-4 min-w-[200px]">Left</div>}
                  placement="left"
                />
                <Popover
                  trigger={<Button variant="secondary">Left End</Button>}
                  content={<div className="p-4 min-w-[200px]">Left End</div>}
                  placement="left-end"
                />
              </div>

              <div className="flex flex-col gap-4">
                <Popover
                  trigger={<Button variant="secondary">Right Start</Button>}
                  content={<div className="p-4 min-w-[200px]">Right Start</div>}
                  placement="right-start"
                />
                <Popover
                  trigger={<Button variant="secondary">Right</Button>}
                  content={<div className="p-4 min-w-[200px]">Right</div>}
                  placement="right"
                />
                <Popover
                  trigger={<Button variant="secondary">Right End</Button>}
                  content={<div className="p-4 min-w-[200px]">Right End</div>}
                  placement="right-end"
                />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex flex-col gap-4">
              <Popover
                trigger={<Button variant="secondary">Bottom Start</Button>}
                content={<div className="p-4 min-w-[200px]">Bottom Start</div>}
                placement="bottom-start"
              />
              <Popover
                trigger={<Button variant="secondary">Bottom</Button>}
                content={<div className="p-4 min-w-[200px]">Bottom</div>}
                placement="bottom"
              />
              <Popover
                trigger={<Button variant="secondary">Bottom End</Button>}
                content={<div className="p-4 min-w-[200px]">Bottom End</div>}
                placement="bottom-end"
              />
            </div>
          </div>
        </section>

        {/* With Arrow */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">With/Without Arrow</h2>
          <div className="flex gap-4">
            <Popover
              trigger={<Button>With Arrow</Button>}
              content={<div className="p-4">Popover with arrow</div>}
              arrow={true}
            />
            <Popover
              trigger={<Button>Without Arrow</Button>}
              content={<div className="p-4">Popover without arrow</div>}
              arrow={false}
            />
          </div>
        </section>

        {/* With Close Button */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">With Close Button</h2>
          <Popover
            trigger={<Button>Show Popover</Button>}
            content={
              <div className="p-4 pr-8">
                <h3 className="font-semibold mb-2">Closeable Popover</h3>
                <p className="text-sm text-gray-600">
                  Click the X button to close this popover.
                </p>
              </div>
            }
            showCloseButton={true}
          />
        </section>

        {/* Scrollable Content */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Scrollable Content</h2>
          <Popover
            trigger={<Button>Show Long Content</Button>}
            content={
              <div className="p-4">
                <h3 className="font-semibold mb-2">Long Content</h3>
                <div className="space-y-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      Line {i + 1}: This is scrollable content
                    </p>
                  ))}
                </div>
              </div>
            }
            scrollable={true}
            maxHeight="300px"
          />
        </section>

        {/* Controlled */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Controlled Popover</h2>
          <div className="flex gap-4">
            <Popover
              trigger={<Button>Toggle Popover</Button>}
              content={
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    This popover is controlled externally.
                  </p>
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                </div>
              }
              open={isOpen}
              onOpenChange={setIsOpen}
            />
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Close" : "Open"} from Outside
            </Button>
          </div>
        </section>

        {/* Real World Examples */}
        <section className="bg-white p-8 rounded-lg border">
          <h2 className="text-xl font-bold mb-6">Real World Examples</h2>

          {/* User Menu */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-gray-700">User Menu</h3>
            <Popover
              trigger={
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                    YD
                  </div>
                  <span className="font-medium">Yaşar Demirtaş</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </button>
              }
              content={
                <div className="py-2 min-w-[200px]">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors">
                    Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors">
                    Settings
                  </button>
                  <div className="border-t my-1" />
                  <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors">
                    Logout
                  </button>
                </div>
              }
              placement="bottom-end"
            />
          </div>

          {/* Notifications */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4 text-gray-700">Notifications</h3>
            <Popover
              trigger={
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              }
              content={
                <div className="w-80">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-[300px] overflow-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="font-medium text-sm">
                          New message received
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          2 minutes ago
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t">
                    <button className="text-sm text-primary-500 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              }
              placement="bottom-end"
              scrollable={true}
            />
          </div>

          {/* Actions Menu */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-700">Actions Menu</h3>
            <Popover
              trigger={
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2" />
                  </svg>
                </button>
              }
              content={
                <div className="py-2 min-w-[160px]">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    View
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </button>
                  <div className="border-t my-1" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              }
              placement="bottom-end"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PopoverExamples;
