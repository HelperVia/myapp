import { DepartmentType } from "@/types/team/department";
import { DepartmentNameRender } from "../DepartmentNameRender";
import { DepartmentMembersRender } from "../DepartmentMembersRender";

export const MobileRender = (department: DepartmentType) => (
  <div className="bg-white rounded-lg border border-gray-200 p-3">
    <div className="flex items-start justify-between mb-3 pb-3 border-b border-gray-100">
      <div className="flex-1 min-w-0 mr-2">
        <DepartmentNameRender department={department} />
      </div>
      <DepartmentMembersRender department={department} />
    </div>

    <div className="flex justify-end"></div>
  </div>
);
