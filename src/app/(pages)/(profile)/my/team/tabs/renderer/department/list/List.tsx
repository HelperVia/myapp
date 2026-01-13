import { RightSidebarContext } from "@/components/layout/context/right-sidebar-context";
import React from "react";
import { ResponsiveDataView, SortOption } from "@/components/datalist";
import { MobileRender } from "./Mobile";
import { DesktopColumns } from "./DesktopColumns";
import { DepartmentSidebar } from "@/components/teams/department-sidebar";
import { DepartmentType } from "@/types/team/department";

export const DepartmentList = ({
  departments,
  searchValue,
}: {
  departments: DepartmentType[];
  searchValue: string;
}) => {
  const { setSidebar } = React.use(RightSidebarContext);

  const setSelectSidebar = (data: DepartmentType) => {
    setSidebar({
      component: <DepartmentSidebar department={data} />,
      className: "min-w-[300px] lg:min-w-[400px]",
      header: {
        title: "Details",
        close: true,
      },
    });
  };

  const sortOptions: SortOption[] = [
    { key: "department_name", label: "Department Name" },
  ];
  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <ResponsiveDataView
        maxHeight="100%"
        sortable={true}
        data={departments}
        searchValue={searchValue}
        searchKeys={["department_name"]}
        desktopColumns={DesktopColumns}
        mobileRender={MobileRender}
        sortOptions={sortOptions}
        stickyHeader
        onItemClick={(department) => setSelectSidebar(department)}
      />
    </div>
  );
};
