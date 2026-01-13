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
 * │  Component: DataTable Examples                          │
 * └─────────────────────────────────────────────────────────┘
 */

import React, { useState } from "react";
import { DataTable } from "./DataTable";
import { ResponsiveDataView } from "./ResponsiveDataView";
import { TableColumn, SortOption, SortConfig } from "./types";

// ==========================================
// DATA TYPES
// ==========================================

interface Agent {
  id: string;
  name: string;
  email: string;
  status: "online" | "offline" | "away";
  chat_limit: number;
  active_chats: number;
  total_chats: number;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "online",
    chat_limit: 10,
    active_chats: 5,
    total_chats: 150,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "away",
    chat_limit: 8,
    active_chats: 3,
    total_chats: 200,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "offline",
    chat_limit: 12,
    active_chats: 0,
    total_chats: 95,
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: "online",
    chat_limit: 15,
    active_chats: 8,
    total_chats: 320,
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@example.com",
    status: "online",
    chat_limit: 10,
    active_chats: 6,
    total_chats: 180,
  },
];

// ==========================================
// RENDER COMPONENTS
// ==========================================

const AgentAvatar: React.FC<{ agent: Agent }> = ({ agent }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm sm:text-base shrink-0">
      {agent.name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </div>
    <div className="min-w-0">
      <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
        {agent.name}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 truncate">
        {agent.email}
      </div>
    </div>
  </div>
);

const AgentStatus: React.FC<{ agent: Agent }> = ({ agent }) => {
  const config = {
    online: { color: "bg-green-100 text-green-800", label: "Online" },
    away: { color: "bg-yellow-100 text-yellow-800", label: "Away" },
    offline: { color: "bg-gray-100 text-gray-800", label: "Offline" },
  };
  return (
    <span
      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
        config[agent.status].color
      } whitespace-nowrap`}
    >
      {config[agent.status].label}
    </span>
  );
};

const AgentActions: React.FC<{ agent: Agent }> = ({ agent }) => (
  <div className="flex items-center gap-1 sm:gap-2">
    <button
      onClick={(e) => {
        e.stopPropagation();
        alert(`Edit ${agent.name}`);
      }}
      className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      title="Edit"
    >
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        confirm(`Delete ${agent.name}?`);
      }}
      className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Delete"
    >
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
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
    </button>
  </div>
);

// ==========================================
// EXAMPLE 1: BASIC DATATABLE
// ==========================================

export const BasicDataTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({ key: "", direction: null });

  const columns: TableColumn<Agent>[] = [
    {
      key: "name",
      header: "Agent",
      sortable: true,
      render: (agent) => <AgentAvatar agent={agent} />,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (agent) => <AgentStatus agent={agent} />,
    },
    {
      key: "chat_limit",
      header: "Limit",
      sortable: true,
      align: "center",
      render: (agent) => (
        <span className="font-semibold">{agent.chat_limit}</span>
      ),
    },
    {
      key: "active_chats",
      header: "Active",
      sortable: true,
      align: "center",
      render: (agent) => (
        <span className="font-semibold">{agent.active_chats}</span>
      ),
    },
    {
      key: "total_chats",
      header: "Total",
      sortable: true,
      align: "center",
      render: (agent) => (
        <span className="font-semibold">{agent.total_chats}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (agent) => <AgentActions agent={agent} />,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Basic DataTable
        </h2>
        <p className="text-gray-600">Simple table with search and sort</p>
      </div>

      {/* External Search */}
      <div className="mb-4 relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agents..."
          className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/10"
        />
      </div>

      <DataTable
        data={mockAgents}
        columns={columns}
        searchValue={search}
        searchKeys={["name", "email"]}
        sortConfig={sort}
        onSortChange={setSort}
        onRowClick={(agent) => console.log("Clicked:", agent)}
      />
    </div>
  );
};

// ==========================================
// EXAMPLE 2: STICKY HEADER WITH MAX HEIGHT
// ==========================================

export const StickyHeaderTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({ key: "", direction: null });

  const columns: TableColumn<Agent>[] = [
    {
      key: "name",
      header: "Agent",
      sortable: true,
      render: (agent) => <AgentAvatar agent={agent} />,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (agent) => <AgentStatus agent={agent} />,
    },
    { key: "chat_limit", header: "Limit", sortable: true, align: "center" },
    { key: "active_chats", header: "Active", sortable: true, align: "center" },
    {
      key: "actions",
      header: "Actions",
      render: (agent) => <AgentActions agent={agent} />,
    },
  ];

  // Duplicate data for scrolling demo
  const extendedData = [...mockAgents, ...mockAgents, ...mockAgents];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sticky Header Table
        </h2>
        <p className="text-gray-600">Table with fixed header and max height</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full h-10 px-4 rounded-lg border border-gray-300"
        />
      </div>

      <DataTable
        data={extendedData}
        columns={columns}
        searchValue={search}
        searchKeys={["name", "email"]}
        sortConfig={sort}
        onSortChange={setSort}
        stickyHeader
        maxHeight="400px"
      />
    </div>
  );
};

// ==========================================
// EXAMPLE 3: CUSTOM SORT SELECT
// ==========================================

export const CustomSortTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({ key: "", direction: null });

  const columns: TableColumn<Agent>[] = [
    {
      key: "name",
      header: "Agent",
      sortable: true,
      render: (agent) => <AgentAvatar agent={agent} />,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (agent) => <AgentStatus agent={agent} />,
    },
    { key: "chat_limit", header: "Limit", sortable: true },
    { key: "active_chats", header: "Active", sortable: true },
  ];

  const sortOptions: SortOption[] = [
    { key: "name", label: "Name" },
    { key: "chat_limit", label: "Chat Limit" },
    { key: "active_chats", label: "Active Chats" },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Custom Sort Select
        </h2>
        <p className="text-gray-600">Using your own select component</p>
      </div>

      {/* Search & Sort Row */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 h-10 px-4 rounded-lg border border-gray-300"
        />

        {/* Your Custom Select Component */}
        <select
          value={sort.key ? `${sort.key}-${sort.direction}` : ""}
          onChange={(e) => {
            if (!e.target.value) {
              setSort({ key: "", direction: null });
            } else {
              const [key, direction] = e.target.value.split("-");
              setSort({ key, direction: direction as "asc" | "desc" });
            }
          }}
          className="h-10 px-4 rounded-lg border border-gray-300 bg-white"
        >
          <option value="">Sort by</option>
          {sortOptions.map((opt) => (
            <React.Fragment key={opt.key}>
              <option value={`${opt.key}-asc`}>{opt.label} (A-Z)</option>
              <option value={`${opt.key}-desc`}>{opt.label} (Z-A)</option>
            </React.Fragment>
          ))}
        </select>
      </div>

      <DataTable
        data={mockAgents}
        columns={columns}
        searchValue={search}
        searchKeys={["name", "email"]}
        sortConfig={sort}
        sortable={false} // Disable column sort
      />
    </div>
  );
};

// ==========================================
// EXAMPLE 4: RESPONSIVE DATA VIEW
// ==========================================

export const ResponsiveExample: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortConfig>({ key: "", direction: null });

  const desktopColumns: TableColumn<Agent>[] = [
    {
      key: "name",
      header: "Agent",
      sortable: true,
      render: (agent) => <AgentAvatar agent={agent} />,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (agent) => <AgentStatus agent={agent} />,
    },
    { key: "chat_limit", header: "Limit", sortable: true, align: "center" },
    { key: "active_chats", header: "Active", sortable: true, align: "center" },
    { key: "total_chats", header: "Total", sortable: true, align: "center" },
    {
      key: "actions",
      header: "Actions",
      render: (agent) => <AgentActions agent={agent} />,
    },
  ];

  const mobileRender = (agent: Agent) => (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-start justify-between mb-3 pb-3 border-b border-gray-100">
        <div className="flex-1 min-w-0 mr-2">
          <AgentAvatar agent={agent} />
        </div>
        <AgentStatus agent={agent} />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <p className="text-base font-bold text-gray-900">
            {agent.chat_limit}
          </p>
          <p className="text-xs text-gray-500">Limit</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-gray-900">
            {agent.active_chats}
          </p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="text-center">
          <p className="text-base font-bold text-gray-900">
            {agent.total_chats}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
      <div className="flex justify-end">
        <AgentActions agent={agent} />
      </div>
    </div>
  );

  const sortOptions: SortOption[] = [
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
    { key: "chat_limit", label: "Chat Limit" },
    { key: "active_chats", label: "Active Chats" },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Responsive View
        </h2>
        <p className="text-gray-600">Auto-switches between table and cards</p>
      </div>

      {/* External Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agents..."
          className="w-full h-10 px-4 rounded-lg border border-gray-300"
        />
      </div>

      <ResponsiveDataView
        data={mockAgents}
        desktopColumns={desktopColumns}
        mobileRender={mobileRender}
        searchValue={search}
        onSearchChange={setSearch}
        searchKeys={["name", "email"]}
        sortConfig={sort}
        onSortChange={setSort}
        sortOptions={sortOptions}
        stickyHeader
        maxHeight="500px"
        onItemClick={(agent) => console.log("Clicked:", agent)}
      />
    </div>
  );
};

// ==========================================
// DEMO APP
// ==========================================

export const DataTableDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    { title: "Basic Table", component: <BasicDataTable /> },
    { title: "Sticky Header", component: <StickyHeaderTable /> },
    { title: "Custom Sort", component: <CustomSortTable /> },
    { title: "Responsive", component: <ResponsiveExample /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            DataTable Examples
          </h1>
          <p className="text-gray-600">
            Professional, production-ready data table component
          </p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === index
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        <div>{examples[activeTab].component}</div>
      </div>
    </div>
  );
};

export default DataTableDemo;
