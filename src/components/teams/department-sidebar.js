import React from "react";

import { useAppSelector } from "@store/hooks";
import { DepartmentNameCard } from "./department-name-card";
import { DetailsCard } from "../chat/chatRightContent/details-card";
import { AgentUserCard } from "./agent-user-card";

export const DepartmentSidebar = (props) => {
  const chatprop = useAppSelector((state) => state.app);
  let department = chatprop.departments.find(
    (department) => department.id == props.department
  );

  console.log(department);
  return (
    <React.Fragment>
      {department && (
        <React.Fragment>
          <div className="p-5">
            <DepartmentNameCard
              department={{
                department_name: department.department,
                first_letter: department.first_letter,
              }}
            />
          </div>

          {Object.keys(department.agents).length > 0 && (
            <DetailsCard
              title={"Agents"}
              badge={Object.keys(department.agents).length}
              expanded={true}
            >
              <div className="flex flex-wrap flex-col gap-[10px]">
                {Object.keys(department.agents).map((agent) => {
                  return (
                    <React.Fragment>
                      <AgentUserCard
                        agentVariant="rounded"
                        emailShow={false}
                        avatarClassName="!w-[20px] !h-[20px] !text-[12px]"
                        agent={department.agents[agent]}
                        roleShow={false}
                        agentNameClassName="!font-normal"
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </DetailsCard>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
