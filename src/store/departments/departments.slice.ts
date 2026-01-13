import { TeamType } from "@/types/team/teams.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Omit<TeamType, "agents"> = {
  departments: [],
};
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setAllDepartments(state, action) {
      Object.assign(state.departments, action.payload);
    },
  },
});

export const { setAllDepartments } = departmentSlice.actions;
export default departmentSlice.reducer;
