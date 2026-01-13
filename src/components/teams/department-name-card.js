import React from "react";
import { Chip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { crc32 } from "@lib/helper";
import {
  blue,
  deepOrange,
  deepPurple,
  lightGreen,
  red,
} from "@mui/material/colors";

export const DepartmentNameCard = ({ department }) => {
  const userColor = [
    deepPurple[500],
    deepOrange[500],
    lightGreen[500],
    red[800],
    blue[500],
  ];
  console.log(department);
  const label =
    department.department_name.length > 30
      ? department.department_name.substring(0, 30) + "..."
      : department.department_name;

  return (
    <React.Fragment>
      {department && (
        <Chip
          sx={{ borderRadius: "0px" }}
          size="large"
          avatar={
            <Avatar
              variant="rounded"
              sx={{
                color: "#fff!important",
                bgcolor:
                  userColor[
                    crc32(department.department_name) % userColor.length
                  ],
              }}
            >
              {department.first_letter}
            </Avatar>
          }
          label={label}
        />
      )}
    </React.Fragment>
  );
};
