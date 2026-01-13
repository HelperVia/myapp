import { DepartmentName as DepartmentBadge } from "@/components/badge";
import { BadgeProps } from "@/components/ui/badge";

interface DepartmentNameType extends Omit<BadgeProps, "children"> {
  uuid?: string;
  departmentName: string;
}
export const DepartmentName = ({
  uuid,
  departmentName,
  ...badgeProps
}: DepartmentNameType) => {
  return (
    <DepartmentBadge
      uuid={uuid}
      departmentName={departmentName}
      {...badgeProps}
      showDot
    />
  );
};
