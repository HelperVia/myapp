"use client";
import React, { useCallback, useRef, useState } from "react";

import { useAppSelector } from "@store/hooks";

import { getWithAgents } from "@/store/departments/department.selector";
import { DepartmentList } from "./renderer/department/list/List";
import { DepartmentHeader } from "./renderer/department/DepartmentHeader";
import { DepartmentType } from "@/types/team/department";

export const Departments = () => {
  const departments = useAppSelector(getWithAgents);
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="bg-gray-50 flex-1 flex flex-col overflow-hidden">
      <DepartmentHeader onChange={onChange} />
      <DepartmentList
        departments={departments as DepartmentType[]}
        searchValue={searchValue}
      />
    </div>
  );
};
