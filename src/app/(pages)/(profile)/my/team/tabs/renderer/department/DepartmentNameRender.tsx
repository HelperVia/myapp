import React from "react";

import { DepartmentType } from "@/types/team/department";
import { DepartmentName } from "@/components/teams/department";
export const DepartmentNameRender = ({
  department,
}: {
  department: DepartmentType;
}) => {
  return (
    <DepartmentName
      uuid={department?.id}
      departmentName={department?.department_name}
    />
  );
};
