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
 * │  Component: Tabs Examples                               │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useState } from "react";
import { Tabs, TabItem } from "./index";

// Example 1: Basic Tabs with Content
export const BasicExample: React.FC = () => {
  const tabs: TabItem[] = [
    {
      value: "agents",
      label: "Agents",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Agents</h2>
          <p className="text-gray-600">Agent management content goes here...</p>
        </div>
      ),
    },
    {
      value: "departments",
      label: "Departments",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Departments</h2>
          <p className="text-gray-600">Department management content goes here...</p>
        </div>
      ),
    },
    {
      value: "settings",
      label: "Settings",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <p className="text-gray-600">Settings content goes here...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="h-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <Tabs tabs={tabs} defaultValue="agents" />
      </div>
    </div>
  );
};

// Example 2: Controlled Tabs with onChange
export const ControlledExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs: TabItem[] = [
    {
      value: "profile",
      label: "Profile",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
          <p className="text-gray-600">Current tab: {activeTab}</p>
        </div>
      ),
    },
    {
      value: "security",
      label: "Security",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      badge: "3",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Security Settings</h2>
          <p className="text-gray-600">Current tab: {activeTab}</p>
        </div>
      ),
    },
    {
      value: "notifications",
      label: "Notifications",
      badge: "12",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
          <p className="text-gray-600">Current tab: {activeTab}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="h-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <Tabs
          tabs={tabs}
          value={activeTab}
          onChange={(value) => {
            console.log("Tab changed to:", value);
            setActiveTab(value);
          }}
        />
      </div>
    </div>
  );
};

// Example 3: Pills Variant
export const PillsExample: React.FC = () => {
  const tabs: TabItem[] = [
    {
      value: "all",
      label: "All",
      badge: "24",
      content: (
        <div className="p-6">
          <h3 className="font-semibold mb-2">All Messages</h3>
          <p className="text-gray-600">24 messages</p>
        </div>
      ),
    },
    {
      value: "unread",
      label: "Unread",
      badge: "5",
      content: (
        <div className="p-6">
          <h3 className="font-semibold mb-2">Unread Messages</h3>
          <p className="text-gray-600">5 unread messages</p>
        </div>
      ),
    },
    {
      value: "archived",
      label: "Archived",
      content: (
        <div className="p-6">
          <h3 className="font-semibold mb-2">Archived Messages</h3>
          <p className="text-gray-600">No archived messages</p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="h-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4">
        <Tabs tabs={tabs} variant="pills" defaultValue="all" />
      </div>
    </div>
  );
};

// Example 4: Full Width Tabs
export const FullWidthExample: React.FC = () => {
  const tabs: TabItem[] = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600">Dashboard overview...</p>
        </div>
      ),
    },
    {
      value: "analytics",
      label: "Analytics",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          <p className="text-gray-600">Analytics data...</p>
        </div>
      ),
    },
    {
      value: "reports",
      label: "Reports",
      content: (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Reports</h2>
          <p className="text-gray-600">Reports section...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="h-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <Tabs tabs={tabs} fullWidth defaultValue="overview" />
      </div>
    </div>
  );
};

// Example 5: With Disabled Tab
export const DisabledExample: React.FC = () => {
  const tabs: TabItem[] = [
    {
      value: "active",
      label: "Active",
      content: <div className="p-6">Active tab content</div>,
    },
    {
      value: "disabled",
      label: "Disabled",
      disabled: true,
      content: <div className="p-6">This tab is disabled</div>,
    },
    {
      value: "another",
      label: "Another",
      content: <div className="p-6">Another tab content</div>,
    },
  ];

  return (
    <div className="h-screen bg-gray-50 p-8">
      <div className="h-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <Tabs tabs={tabs} defaultValue="active" />
      </div>
    </div>
  );
};

// Main Example Component
export const TabsExample: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>("basic");

  const examples = [
    { value: "basic", label: "Basic", component: <BasicExample /> },
    { value: "controlled", label: "Controlled", component: <ControlledExample /> },
    { value: "pills", label: "Pills", component: <PillsExample /> },
    { value: "fullwidth", label: "Full Width", component: <FullWidthExample /> },
    { value: "disabled", label: "Disabled", component: <DisabledExample /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Example Selector */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Tabs Component Examples</h1>
          <div className="flex gap-2 flex-wrap">
            {examples.map((example) => (
              <button
                key={example.value}
                onClick={() => setSelectedExample(example.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedExample === example.value
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Example Content */}
      <div>
        {examples.find((e) => e.value === selectedExample)?.component}
      </div>
    </div>
  );
};

export default TabsExample;
