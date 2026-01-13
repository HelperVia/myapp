import React from "react";

import { useAppSelector } from "@store/hooks";
import { DepartmentNameCard } from "./department-name-card";
import { DetailsCard } from "../chat/chatRightContent/details-card";
import { AgentCard } from "./index";

export const DepartmentSidebar = (props) => {
  let department = props.department;

  return (
    <React.Fragment>
      {department && (
        <React.Fragment>
          <div className="p-5">
            <DepartmentNameCard department={department} />
          </div>

          {department?.agents.length > 0 && (
            <DetailsCard
              title={"Agents"}
              badge={department.agents.length}
              expanded={true}
            >
              <div className="flex flex-wrap flex-col gap-[10px]">
                {department.agents.map((agent) => {
                  return (
                    <AgentCard
                      size="md"
                      editable="true"
                      agent={agent}
                      away={true}
                    />
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
