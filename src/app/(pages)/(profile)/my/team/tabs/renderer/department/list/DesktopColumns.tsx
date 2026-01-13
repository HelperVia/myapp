import { TableColumn } from "@/components/datalist";

import { DepartmentType } from "@/types/team/department";

import { DepartmentNameRender } from "../DepartmentNameRender";
import { DepartmentMembersRender } from "../DepartmentMembersRender";

export const DesktopColumns: TableColumn<DepartmentType>[] = [
  {
    key: "name",
    header: "Department",
    sortable: true,
    render: (department) => <DepartmentNameRender department={department} />,
  },
  {
    key: "members",
    header: "Members",
    sortable: true,
    render: (department) => <DepartmentMembersRender department={department} />,
  },

  {
    key: "actions",
    header: "Actions",
  },
];
