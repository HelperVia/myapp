import { Badge, BadgeProps } from "@components/ui/badge";

interface DepartmentNameType extends Omit<BadgeProps, "children"> {
  departmentName: string;
}

export const DepartmentName = ({
  departmentName,
  ...badgeProps
}: DepartmentNameType) => {
  return <Badge {...badgeProps}>{departmentName}</Badge>;
};
